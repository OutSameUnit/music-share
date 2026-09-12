const STORAGE_KEYS = {
  user: 'music-share-user-v1',
  playlists: 'music-share-playlists-v1',
  favorites: 'music-share-favorites-v1',
};

const DEFAULT_TRACKS = [
  {
    id: 'blue',
    title: 'Blue',
    artist: 'Family',
    genre: 'Mood',
    src: 'assets/videos/Blue.mp4',
  },
  {
    id: 'fall',
    title: 'I fall into you',
    artist: 'Family',
    genre: 'Relax',
    src: 'assets/videos/I%20fall%20into%20you.mp4',
  },
  {
    id: 'up',
    title: 'We go up',
    artist: 'Family',
    genre: 'Energy',
    src: 'assets/videos/We%20go%20up.MP4',
  },
];

const appConfig = window.MUSIC_SHARE_CONFIG || {
  supabase: { url: '', anonKey: '', provider: 'google', providers: ['google', 'github'] },
  cloudinary: { cloudName: '', uploadPreset: '' },
  app: { mode: 'local-first' },
};

const state = {
  user: null,
  playlists: [],
  favorites: [],
  currentPlaylistId: null,
  currentTrackIndex: 0,
  repeatMode: 'normal',
  queue: [...DEFAULT_TRACKS],
};

const elements = {
  loginGoogleBtn: document.getElementById('loginGoogleBtn'),
  loginGithubBtn: document.getElementById('loginGithubBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  userBadge: document.getElementById('userBadge'),
  authHint: document.getElementById('authHint'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredSubtitle: document.getElementById('featuredSubtitle'),
  featuredMode: document.getElementById('featuredMode'),
  createPlaylistBtn: document.getElementById('createPlaylistBtn'),
  videoUploadInput: document.getElementById('videoUploadInput'),
  recentMusicList: document.getElementById('recentMusicList'),
  favoritePlaylistList: document.getElementById('favoritePlaylistList'),
  myPlaylistList: document.getElementById('myPlaylistList'),
  playlistCount: document.getElementById('playlistCount'),
  playerModeBadge: document.getElementById('playerModeBadge'),
  videoPlayer: document.getElementById('videoPlayer'),
  currentTime: document.getElementById('currentTime'),
  totalTime: document.getElementById('totalTime'),
  progressFill: document.getElementById('progressFill'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  playPauseBtn: document.getElementById('playPauseBtn'),
  modeButtons: Array.from(document.querySelectorAll('.mode-btn')),
};

function safeParse(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return null;
  }
}

function loadState() {
  state.user = safeParse(localStorage.getItem(STORAGE_KEYS.user)) || null;
  state.playlists = safeParse(localStorage.getItem(STORAGE_KEYS.playlists)) || [];
  state.favorites = safeParse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(state.user));
  localStorage.setItem(STORAGE_KEYS.playlists, JSON.stringify(state.playlists));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
}

function getSupabaseClient() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    return null;
  }

  const { url, anonKey } = appConfig.supabase || {};
  if (!url || url.includes('YOUR_') || !anonKey || anonKey.includes('YOUR_')) {
    return null;
  }

  return window.supabase.createClient(url, anonKey);
}

function getConfiguredProviders() {
  const configured = Array.isArray(appConfig.supabase?.providers)
    ? appConfig.supabase.providers
    : appConfig.supabase?.provider
      ? [appConfig.supabase.provider]
      : ['google', 'github'];

  return configured.filter((provider) => ['google', 'github'].includes(provider));
}

function getConfiguredAuthProvider() {
  const providers = getConfiguredProviders();
  return providers.length > 0 ? providers[0] : 'google';
}

function applyAvailableAuthButtons() {
  const providers = new Set(getConfiguredProviders());
  const showGoogle = providers.has('google');
  const showGithub = providers.has('github');

  elements.loginGoogleBtn.classList.toggle('hidden', !showGoogle);
  elements.loginGithubBtn.classList.toggle('hidden', !showGithub);
}

async function signInWithProvider(providerName) {
  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  const provider = ['google', 'github'].includes(providerName) ? providerName : getConfiguredAuthProvider();
  const options = {
    redirectTo: window.location.origin,
  };

  if (provider === 'google') {
    options.queryParams = {
      prompt: 'select_account',
    };
  }

  if (provider === 'github') {
    options.queryParams = {
      prompt: 'login',
    };
  }

  const { error } = await client.auth.signInWithOAuth({
    provider,
    options,
  });

  if (error) {
    console.error(`Supabase ${provider} login failed`, error);
    return false;
  }

  return true;
}

async function signOutIfPossible() {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut({ scope: 'global' });
  }

  localStorage.removeItem(STORAGE_KEYS.user);
  state.user = null;
}

async function handleLogin(providerName) {
  const loginSucceeded = await signInWithProvider(providerName);
  if (loginSucceeded) {
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client.auth.getUser();
      if (!error && data?.user) {
        applyUserProfile(data.user);
        saveState();
        updateAuthUI();
        await loadSupabasePlaylists();
      }
    }
    return;
  }

  loginAsMockUser();
}

async function restoreSupabaseSession() {
  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  const { data, error } = await client.auth.getSession();
  if (error) {
    console.error('Supabase session lookup failed', error);
    return false;
  }

  const user = data?.session?.user;
  if (!user) {
    return false;
  }

  applyUserProfile(user);
  saveState();
  updateAuthUI();
  await loadSupabasePlaylists();
  return true;
}

async function uploadVideoToCloudinary(file) {
  const { cloudName, uploadPreset } = appConfig.cloudinary || {};

  if (!cloudName || cloudName.includes('YOUR_') || !uploadPreset || uploadPreset.includes('YOUR_')) {
    return {
      secure_url: URL.createObjectURL(file),
      localFallback: true,
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Cloudinary upload failed');
  }

  return response.json();
}

function ensureSeedPlaylists() {
  if (state.playlists.length > 0) {
    return;
  }

  const seed = [
    {
      id: 'playlist-default',
      name: 'ここだけのプレイリスト',
      owner: '匿名',
      items: [
        { ...DEFAULT_TRACKS[0] },
        { ...DEFAULT_TRACKS[1] },
        { ...DEFAULT_TRACKS[2] },
      ],
      isPublic: false,
      createdAt: Date.now(),
    },
    {
      id: 'playlist-family-night',
      name: '家族の夜',
      owner: '家族',
      items: [{ ...DEFAULT_TRACKS[2] }, { ...DEFAULT_TRACKS[0] }],
      isPublic: true,
      createdAt: Date.now() + 1,
    },
  ];

  state.playlists = seed;
  state.currentPlaylistId = seed[0].id;
  state.queue = [...seed[0].items];
  saveState();
}

function getCurrentPlaylist() {
  if (!state.playlists.length) {
    ensureSeedPlaylists();
  }

  return state.playlists.find((playlist) => playlist.id === state.currentPlaylistId) || state.playlists[0];
}

function refreshQueueFromCurrentPlaylist() {
  const playlist = getCurrentPlaylist();
  if (!playlist || !playlist.items || !playlist.items.length) {
    state.queue = [...DEFAULT_TRACKS];
    return;
  }

  state.queue = playlist.items.map((item) => ({
    id: item.id || `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: item.title,
    artist: item.artist || 'Family',
    genre: item.genre || 'Music',
    src: item.src,
  }));
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function setMode(mode) {
  const allowed = ['normal', 'shuffle', 'repeat-list', 'repeat-one'];
  if (!allowed.includes(mode)) {
    return;
  }

  state.repeatMode = mode;
  updateModeButtons();
}

function updateModeButtons() {
  elements.modeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === state.repeatMode);
  });

  const text = {
    normal: '通常',
    shuffle: 'シャッフル',
    'repeat-list': '一覧繰り返し',
    'repeat-one': '1曲繰り返し',
  };

  elements.playerModeBadge.textContent = text[state.repeatMode] || '通常';
}

function getNextIndex() {
  if (!state.queue.length) {
    return 0;
  }

  if (state.repeatMode === 'repeat-one') {
    return state.currentTrackIndex;
  }

  if (state.repeatMode === 'shuffle') {
    let next = Math.floor(Math.random() * state.queue.length);
    while (next === state.currentTrackIndex && state.queue.length > 1) {
      next = Math.floor(Math.random() * state.queue.length);
    }
    return next;
  }

  if (state.repeatMode === 'repeat-list') {
    return (state.currentTrackIndex + 1) % state.queue.length;
  }

  return state.currentTrackIndex < state.queue.length - 1 ? state.currentTrackIndex + 1 : 0;
}

function getPreviousIndex() {
  if (!state.queue.length) {
    return 0;
  }

  if (state.repeatMode === 'shuffle') {
    let previous = Math.floor(Math.random() * state.queue.length);
    while (previous === state.currentTrackIndex && state.queue.length > 1) {
      previous = Math.floor(Math.random() * state.queue.length);
    }
    return previous;
  }

  if (state.repeatMode === 'repeat-list') {
    return (state.currentTrackIndex - 1 + state.queue.length) % state.queue.length;
  }

  return state.currentTrackIndex > 0 ? state.currentTrackIndex - 1 : state.queue.length - 1;
}

function updatePlayButton() {
  const isPaused = elements.videoPlayer.paused;
  elements.playPauseBtn.textContent = isPaused ? '▶' : '⏸';
  elements.playPauseBtn.setAttribute('aria-label', isPaused ? '再生' : '一時停止');
}

function updateProgress() {
  const currentTime = Number.isFinite(elements.videoPlayer.currentTime) ? elements.videoPlayer.currentTime : 0;
  const duration = Number.isFinite(elements.videoPlayer.duration) ? elements.videoPlayer.duration : 0;

  elements.currentTime.textContent = formatTime(currentTime);
  elements.totalTime.textContent = formatTime(duration);
  elements.progressFill.style.width = duration > 0 ? `${(currentTime / duration) * 100}%` : '0%';
}

function loadTrack(index, autoplay = true) {
  if (!state.queue.length) {
    return;
  }

  state.currentTrackIndex = ((index % state.queue.length) + state.queue.length) % state.queue.length;
  const track = state.queue[state.currentTrackIndex];

  if (!track) {
    return;
  }

  elements.videoPlayer.src = track.src;
  elements.videoPlayer.load();
  elements.featuredTitle.textContent = track.title;
  elements.featuredSubtitle.textContent = `${track.artist} · ${track.genre}`;

  if (autoplay) {
    elements.videoPlayer.play().catch(() => {
      updatePlayButton();
    });
  }

  renderRecentMusic();
  updateProgress();
}

function togglePlayback() {
  if (!state.queue.length) {
    return;
  }

  if (elements.videoPlayer.paused) {
    elements.videoPlayer.play().catch(() => {});
  } else {
    elements.videoPlayer.pause();
  }
}

function renderRecentMusic() {
  const tracks = state.queue.length ? state.queue : DEFAULT_TRACKS;

  elements.recentMusicList.innerHTML = tracks
    .map((track, index) => `
      <button class="music-card ${index === state.currentTrackIndex ? 'selected' : ''}" type="button" data-track-index="${index}">
        <span class="cover">♪</span>
        <span class="music-info">
          <strong>${track.title}</strong>
          <small>${track.artist} · ${track.genre}</small>
        </span>
      </button>
    `)
    .join('');

  elements.recentMusicList.querySelectorAll('.music-card').forEach((button) => {
    button.addEventListener('click', () => {
      const idx = Number(button.dataset.trackIndex);
      loadTrack(idx, true);
    });
  });
}

function renderFavoritePlaylists() {
  const favoritePlaylists = state.playlists.filter((playlist) => state.favorites.includes(playlist.id));

  if (!favoritePlaylists.length) {
    elements.favoritePlaylistList.innerHTML = `
      <div class="mini-card">
        <span class="mini-cover">★</span>
        <div>
          <strong>まだお気に入りがありません</strong>
          <small>気に入ったプレイリストに星をつけましょう</small>
        </div>
      </div>
    `;
    return;
  }

  elements.favoritePlaylistList.innerHTML = favoritePlaylists
    .map((playlist) => `
      <div class="mini-card">
        <span class="mini-cover">★</span>
        <div>
          <strong>${playlist.name}</strong>
          <small>${playlist.items?.length || 0}曲</small>
        </div>
      </div>
    `)
    .join('');
}

function renderMyPlaylists() {
  const isAuthenticated = !!state.user;

  if (!isAuthenticated) {
    elements.myPlaylistList.innerHTML = `
      <div class="locked-box">
        <strong>匿名アカウントで利用中</strong>
        <p>ログインするとマイプレイリスト作成と動画アップロードができます。</p>
      </div>
    `;
    elements.playlistCount.textContent = '0件';
    return;
  }

  elements.myPlaylistList.innerHTML = state.playlists
    .map((playlist) => {
      const isFavorite = state.favorites.includes(playlist.id);
      return `
        <div class="playlist-row">
          <div class="playlist-meta">
            <span class="playlist-icon">🎵</span>
            <div>
              <strong>${playlist.name}</strong>
              <small>${playlist.items?.length || 0}曲</small>
            </div>
          </div>
          <div class="playlist-actions">
            <button type="button" class="row-action" data-action="open" data-playlist-id="${playlist.id}">開く</button>
            <button type="button" class="row-action" data-action="favorite" data-playlist-id="${playlist.id}">${isFavorite ? '解除' : 'お気に入り'}</button>
            <button type="button" class="row-action" data-action="toggle-public" data-playlist-id="${playlist.id}">${playlist.isPublic ? '非公開' : '公開'}</button>
            <button type="button" class="row-action" data-action="share" data-playlist-id="${playlist.id}">共有</button>
          </div>
        </div>
      `;
    })
    .join('');

  elements.playlistCount.textContent = `${state.playlists.length}件`;

  elements.myPlaylistList.querySelectorAll('.row-action').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const playlistId = button.dataset.playlistId;
      const playlist = state.playlists.find((p) => p.id === playlistId);

      if (!playlist) {
        return;
      }

      if (action === 'open') {
        state.currentPlaylistId = playlist.id;
        refreshQueueFromCurrentPlaylist();
        state.currentTrackIndex = 0;
        loadTrack(0, true);
        elements.featuredTitle.textContent = playlist.name;
        elements.featuredSubtitle.textContent = `${playlist.items?.length || 0}曲が入っています`;
      }

      if (action === 'favorite') {
        toggleFavorite(playlist.id);
      }

      if (action === 'toggle-public') {
        togglePlaylistPublic(playlist.id);
      }

      if (action === 'share') {
        sharePlaylist(playlist.id);
      }
    });
  });
}

async function updateAuthUI() {
  const authenticated = !!state.user;
  const providers = new Set(getConfiguredProviders());
  const showGoogle = !authenticated && providers.has('google');
  const showGithub = !authenticated && providers.has('github');

  elements.loginGoogleBtn.classList.toggle('hidden', !showGoogle);
  elements.loginGithubBtn.classList.toggle('hidden', !showGithub);
  elements.logoutBtn.classList.toggle('hidden', !authenticated);

  if (authenticated) {
    elements.userBadge.textContent = `${state.user.name || state.user.email.split('@')[0]}さん`;
    elements.userBadge.classList.remove('hidden');
    elements.authHint.textContent = `${state.user.email} でログイン中です。プレイリスト作成とアップロードが利用できます。`;
    elements.featuredMode.textContent = 'ログイン中';
  } else {
    elements.userBadge.textContent = '匿名アカウント';
    elements.userBadge.classList.remove('hidden');
    elements.authHint.textContent = '匿名ユーザーとして利用中です。ログインするとプレイリスト作成とアップロードができます。';
    elements.featuredMode.textContent = '匿名モード';
  }

  const canCreate = authenticated;
  elements.createPlaylistBtn.disabled = !canCreate;
  elements.createPlaylistBtn.classList.toggle('disabled', !canCreate);
  elements.videoUploadInput.disabled = !canCreate;
  if (elements.videoUploadInput.parentElement) {
    elements.videoUploadInput.parentElement.classList.toggle('disabled', !canCreate);
  }

  renderFavoritePlaylists();
  renderMyPlaylists();
}

function loginAsMockUser() {
  const email = window.prompt('Gmailアドレスを入力してください', 'example@gmail.com');
  if (!email) {
    return;
  }

  const name = window.prompt('表示名を入力してください', email.split('@')[0]);
  state.user = {
    email: email.trim(),
    name: (name || email.split('@')[0]).trim(),
  };

  saveState();
  updateAuthUI();
}

async function logoutUser() {
  await signOutIfPossible();
  state.user = null;
  saveState();
  updateAuthUI();
}

function createPlaylist() {
  if (!state.user) {
    alert('ログインするとプレイリスト作成ができます。');
    return;
  }

  const name = window.prompt('プレイリスト名を入力してください', 'ここだけのプレイリスト');
  if (!name) {
    return;
  }

  const playlist = {
    id: `playlist-${Date.now()}`,
    name: name.trim(),
    owner: state.user.name || 'あなた',
    items: [],
    isPublic: false,
    createdAt: Date.now(),
  };

  state.playlists.unshift(playlist);
  state.currentPlaylistId = playlist.id;
  saveState();
  renderMyPlaylists();
  renderFavoritePlaylists();
  refreshQueueFromCurrentPlaylist();
  state.currentTrackIndex = 0;
  loadTrack(0, false);

  if (isSupabaseConfigured()) {
    persistPlaylistToSupabase(playlist);
  }
}

function toggleFavorite(playlistId) {
  if (!state.favorites.includes(playlistId)) {
    state.favorites.push(playlistId);
  } else {
    state.favorites = state.favorites.filter((id) => id !== playlistId);
  }

  saveState();
  renderFavoritePlaylists();
  renderMyPlaylists();

  if (isSupabaseConfigured()) {
    syncFavoritePlaylistsToSupabase();
  }
}

function togglePlaylistPublic(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  playlist.isPublic = !playlist.isPublic;
  saveState();
  renderMyPlaylists();
  renderFavoritePlaylists();

  if (isSupabaseConfigured()) {
    persistPlaylistToSupabase(playlist);
  }
}

function getPlaylistFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('playlist');
}

async function sharePlaylist(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}?playlist=${encodeURIComponent(playlist.id)}`;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareUrl);
      alert('共有URLをコピーしました。');
      return;
    }
  } catch (error) {
    console.warn('Clipboard copy failed, falling back to prompt', error);
  }

  window.prompt('共有URLをコピーしてください', shareUrl);
}

function bindEvents() {
  elements.loginGoogleBtn.addEventListener('click', () => handleLogin('google'));
  elements.loginGithubBtn.addEventListener('click', () => handleLogin('github'));
  elements.logoutBtn.addEventListener('click', logoutUser);
  elements.createPlaylistBtn.addEventListener('click', createPlaylist);
  elements.videoUploadInput.addEventListener('change', (event) => {
    addUploadedVideos(event.target.files);
  });
  elements.playPauseBtn.addEventListener('click', togglePlayback);
  elements.prevBtn.addEventListener('click', () => loadTrack(getPreviousIndex(), true));
  elements.nextBtn.addEventListener('click', () => loadTrack(getNextIndex(), true));

  elements.modeButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  elements.videoPlayer.addEventListener('play', updatePlayButton);
  elements.videoPlayer.addEventListener('pause', updatePlayButton);
  elements.videoPlayer.addEventListener('loadedmetadata', updateProgress);
  elements.videoPlayer.addEventListener('timeupdate', updateProgress);

  elements.videoPlayer.addEventListener('ended', () => {
    if (state.repeatMode === 'repeat-one') {
      elements.videoPlayer.currentTime = 0;
      elements.videoPlayer.play().catch(() => {});
      return;
    }

    loadTrack(getNextIndex(), true);
  });
}

function prepareDemoData() {
  ensureSeedPlaylists();
  state.playlists = state.playlists.length ? state.playlists : [
    {
      id: 'demo-playlist',
      name: 'ここだけのプレイリスト',
      owner: '匿名',
      items: [...DEFAULT_TRACKS],
      isPublic: false,
      createdAt: Date.now(),
    },
  ];

  const playlistIdFromUrl = getPlaylistFromUrl();
  if (playlistIdFromUrl) {
    const foundPlaylist = state.playlists.find((playlist) => playlist.id === playlistIdFromUrl);
    if (foundPlaylist) {
      state.currentPlaylistId = foundPlaylist.id;
    }
  }

  state.currentPlaylistId = state.currentPlaylistId || state.playlists[0].id;
  refreshQueueFromCurrentPlaylist();
}

function initializeApp() {
  loadState();
  prepareDemoData();
  updateModeButtons();
  renderRecentMusic();
  renderFavoritePlaylists();
  renderMyPlaylists();
  applyAvailableAuthButtons();
  updateAuthUI();
  bindEvents();
  restoreSupabaseSession();
  loadTrack(0, false);
}

initializeApp();

const urlPlaylistId = getPlaylistFromUrl();
if (urlPlaylistId) {
  const playlist = state.playlists.find((p) => p.id === urlPlaylistId);
  if (playlist) {
    state.currentPlaylistId = playlist.id;
    refreshQueueFromCurrentPlaylist();
    loadTrack(0, true);
  }
}

function isSupabaseConfigured() {
  const { url, anonKey } = appConfig.supabase || {};
  return Boolean(url && !url.includes('YOUR_') && anonKey && !anonKey.includes('YOUR_'));
}

function applyUserProfile(user) {
  if (!user) {
    return;
  }

  state.user = {
    id: user.id || state.user?.id || null,
    email: user.email || state.user?.email || 'user@example.com',
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || state.user?.name || 'User',
  };
}

async function loadSupabasePlaylists() {
  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    return false;
  }

  const { data, error } = await client
    .from('playlists')
    .select('id, name, description, is_public, created_at, playlist_items(*)')
    .eq('owner_id', state.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase playlist load failed', error);
    return false;
  }

  const mapped = (data || []).map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    owner: state.user?.name || 'あなた',
    items: (playlist.playlist_items || []).map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artist || 'Family',
      genre: item.genre || 'Music',
      src: item.src,
    })),
    isPublic: Boolean(playlist.is_public),
    createdAt: new Date(playlist.created_at).getTime(),
  }));

  if (mapped.length) {
    state.playlists = mapped;
    state.currentPlaylistId = state.currentPlaylistId || mapped[0].id;
    saveState();
    refreshQueueFromCurrentPlaylist();
    return true;
  }

  return false;
}

async function persistPlaylistToSupabase(playlist) {
  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    return false;
  }

  const row = {
    id: playlist.id,
    owner_id: state.user.id,
    name: playlist.name,
    description: playlist.description || '',
    is_public: Boolean(playlist.isPublic),
  };

  const { error: playlistError } = await client.from('playlists').upsert(row, { onConflict: 'id' });
  if (playlistError) {
    console.error('Supabase playlist save failed', playlistError);
    return false;
  }

  const items = (playlist.items || []).map((item, index) => ({
    id: item.id || crypto.randomUUID(),
    playlist_id: playlist.id,
    title: item.title,
    artist: item.artist || 'Family',
    genre: item.genre || 'Music',
    src: item.src,
    order_index: index,
  }));

  const { error: itemError } = await client.from('playlist_items').upsert(items, { onConflict: 'id' });
  if (itemError) {
    console.error('Supabase playlist item save failed', itemError);
    return false;
  }

  return true;
}

async function syncFavoritePlaylistsToSupabase() {
  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    return false;
  }

  const { error: deleteError } = await client.from('favorite_playlists').delete().eq('user_id', state.user.id);
  if (deleteError) {
    console.error('Supabase favorite clear failed', deleteError);
    return false;
  }

  if (!state.favorites.length) {
    return true;
  }

  const rows = state.favorites.map((playlistId) => ({
    user_id: state.user.id,
    playlist_id: playlistId,
  }));

  const { error } = await client.from('favorite_playlists').insert(rows);
  if (error) {
    console.error('Supabase favorite save failed', error);
    return false;
  }

  return true;
}

async function hydrateSupabaseData() {
  if (!isSupabaseConfigured()) {
    return false;
  }

  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  const { data, error } = await client.auth.getUser();
  if (error || !data?.user) {
    return false;
  }

  applyUserProfile(data.user);
  saveState();
  await loadSupabasePlaylists();
  updateAuthUI();
  return true;
}
