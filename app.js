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

const APP_VERSION = '2026-09-13-23';

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const workerUrl = new URL('./service-worker.js', window.location.href);
  workerUrl.searchParams.set('v', APP_VERSION);

  navigator.serviceWorker
    .register(workerUrl.href, { scope: './' })
    .then((registration) => {
      const activateWaitingWorker = () => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      };

      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            activateWaitingWorker();
          }
        }, { once: true });
      }

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      }, { once: true });

      if (navigator.serviceWorker.controller) {
        activateWaitingWorker();
      }
    })
    .catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
}

if (typeof window !== 'undefined') {
  registerServiceWorker();
}

const appConfig = window.MUSIC_SHARE_CONFIG || {
  supabase: { url: '', anonKey: '', provider: 'google', providers: ['google', 'github'] },
  cloudinary: { cloudName: '', uploadPreset: '' },
  app: { mode: 'local-first' },
};

const elements = {
  loginSelectBtn: document.getElementById('loginSelectBtn'),
  loginGoogleBtn: document.getElementById('loginGoogleBtn'),
  loginGithubBtn: document.getElementById('loginGithubBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  userBadge: document.getElementById('userBadge'),
  authHint: document.getElementById('authHint'),
  authHintMember: document.getElementById('authHintMember'),
  topSearchInput: document.getElementById('topSearchInput'),
  topSearchResults: document.getElementById('topSearchResults'),
  anonymousLoginBtn: document.getElementById('anonymousLoginBtn'),
  anonymousPreviewBtn: document.getElementById('anonymousPreviewBtn'),
  anonymousView: document.getElementById('anonymousView'),
  anonymousMusicPanel: document.getElementById('anonymousMusicPanel'),
  anonymousMusicList: document.getElementById('anonymousMusicList'),
  memberView: document.getElementById('memberView'),
  authModal: document.getElementById('authModal'),
  closeAuthModalBtn: document.getElementById('closeAuthModalBtn'),
  profileModal: document.getElementById('profileModal'),
  publicProfileModal: document.getElementById('publicProfileModal'),
  closeProfileModalBtn: document.getElementById('closeProfileModalBtn'),
  closePublicProfileModalBtn: document.getElementById('closePublicProfileModalBtn'),
  cancelProfileBtn: document.getElementById('cancelProfileBtn'),
  profileForm: document.getElementById('profileForm'),
  profileNicknameInput: document.getElementById('profileNicknameInput'),
  profileBioInput: document.getElementById('profileBioInput'),
  profileIconOptions: document.getElementById('profileIconOptions'),
  profileAvatarPreview: document.getElementById('profileAvatarPreview'),
  profilePreviewName: document.getElementById('profilePreviewName'),
  publicProfileAvatar: document.getElementById('publicProfileAvatar'),
  publicProfileName: document.getElementById('publicProfileName'),
  publicProfileDetails: document.getElementById('publicProfileDetails'),
  publicProfileMusicCount: document.getElementById('publicProfileMusicCount'),
  publicProfilePlayCount: document.getElementById('publicProfilePlayCount'),
  publicProfileFavoriteCount: document.getElementById('publicProfileFavoriteCount'),
  publicProfileMusicTab: document.getElementById('publicProfileMusicTab'),
  publicProfilePlaylistsTab: document.getElementById('publicProfilePlaylistsTab'),
  publicProfileMusicList: document.getElementById('publicProfileMusicList'),
  publicProfilePlaylistsList: document.getElementById('publicProfilePlaylistsList'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredSubtitle: document.getElementById('featuredSubtitle'),
  featuredMode: document.getElementById('featuredMode'),
  featuredTitleRight: document.getElementById('featuredTitleRight'),
  featuredSubtitleRight: document.getElementById('featuredSubtitleRight'),
  featuredModeRight: document.getElementById('featuredModeRight'),
  playerTitle: document.getElementById('playerTitle'),
  playerArtist: document.getElementById('playerArtist'),
  playerDate: document.getElementById('playerDate'),
  playerFavoriteBtn: document.getElementById('playerFavoriteBtn'),
  playerShareBtn: document.getElementById('playerShareBtn'),
  playerDescriptionText: document.getElementById('playerDescriptionText'),
  playerDescriptionToggle: document.getElementById('playerDescriptionToggle'),
  videoUploadInput: document.getElementById('videoUploadInput'),
  uploadTitleInput: document.getElementById('uploadTitleInput'),
  uploadDescriptionInput: document.getElementById('uploadDescriptionInput'),
  uploadMetadata: document.querySelector('.upload-metadata'),
  uploadPlaylistSearch: document.getElementById('uploadPlaylistSearch'),
  uploadPlaylistSelect: document.getElementById('uploadPlaylistSelect'),
  uploadPlaylistSort: document.getElementById('uploadPlaylistSort'),
  uploadNewPlaylistBtn: document.getElementById('uploadNewPlaylistBtn'),
  playlistManagerModal: document.getElementById('playlistManagerModal'),
  closePlaylistManagerBtn: document.getElementById('closePlaylistManagerBtn'),
  playlistManagerSearch: document.getElementById('playlistManagerSearch'),
  playlistManagerSort: document.getElementById('playlistManagerSort'),
  newPlaylistNameInput: document.getElementById('newPlaylistNameInput'),
  createPlaylistFromManagerBtn: document.getElementById('createPlaylistFromManagerBtn'),
  playlistManagerList: document.getElementById('playlistManagerList'),
  playlistRenameModal: document.getElementById('playlistRenameModal'),
  closePlaylistRenameBtn: document.getElementById('closePlaylistRenameBtn'),
  cancelPlaylistRenameBtn: document.getElementById('cancelPlaylistRenameBtn'),
  savePlaylistRenameBtn: document.getElementById('savePlaylistRenameBtn'),
  trackEditModal: document.getElementById('trackEditModal'),
  closeTrackEditBtn: document.getElementById('closeTrackEditBtn'),
  cancelTrackEditBtn: document.getElementById('cancelTrackEditBtn'),
  saveTrackEditBtn: document.getElementById('saveTrackEditBtn'),
  trackEditTitleInput: document.getElementById('trackEditTitleInput'),
  trackEditDescriptionInput: document.getElementById('trackEditDescriptionInput'),
  trackEditPlaylistSelect: document.getElementById('trackEditPlaylistSelect'),
  trackEditPlaylistSearch: document.getElementById('trackEditPlaylistSearch'),
  trackEditPlaylistSort: document.getElementById('trackEditPlaylistSort'),
  trackEditNewPlaylistBtn: document.getElementById('trackEditNewPlaylistBtn'),
  playlistRenameInput: document.getElementById('playlistRenameInput'),
  playlistRenameIconSelect: document.getElementById('playlistRenameIconSelect'),
  playlistEditTracks: document.getElementById('playlistEditTracks'),
  playlistDeleteModal: document.getElementById('playlistDeleteModal'),
  closePlaylistDeleteBtn: document.getElementById('closePlaylistDeleteBtn'),
  cancelPlaylistDeleteBtn: document.getElementById('cancelPlaylistDeleteBtn'),
  confirmPlaylistDeleteBtn: document.getElementById('confirmPlaylistDeleteBtn'),
  favoriteClearModal: document.getElementById('favoriteClearModal'),
  closeFavoriteClearBtn: document.getElementById('closeFavoriteClearBtn'),
  cancelFavoriteClearBtn: document.getElementById('cancelFavoriteClearBtn'),
  confirmFavoriteClearBtn: document.getElementById('confirmFavoriteClearBtn'),
  favoriteClearTitle: document.getElementById('favoriteClearTitle'),
  favoriteClearMessage: document.getElementById('favoriteClearMessage'),
  playlistVisibilityModal: document.getElementById('playlistVisibilityModal'),
  closePlaylistVisibilityBtn: document.getElementById('closePlaylistVisibilityBtn'),
  cancelPlaylistVisibilityBtn: document.getElementById('cancelPlaylistVisibilityBtn'),
  confirmPlaylistVisibilityBtn: document.getElementById('confirmPlaylistVisibilityBtn'),
  playlistVisibilityName: document.getElementById('playlistVisibilityName'),
  playlistVisibilityMessage: document.getElementById('playlistVisibilityMessage'),
  playlistDeleteName: document.getElementById('playlistDeleteName'),
  uploadSubmitBtn: document.getElementById('uploadSubmitBtn'),
  uploadStatus: document.getElementById('uploadStatus'),
  appToast: document.getElementById('appToast'),
  clearQueueBtn: document.getElementById('clearQueueBtn'),
  mobileQueueToggleBtn: document.getElementById('mobileQueueToggleBtn'),
  mobileQueueCloseBtn: document.getElementById('mobileQueueCloseBtn'),
  sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
  queuePlaylistAddToggleBtn: document.getElementById('queuePlaylistAddToggleBtn'),
  queuePlaylistModal: document.getElementById('queuePlaylistModal'),
  closeQueuePlaylistModalBtn: document.getElementById('closeQueuePlaylistModalBtn'),
  queuePlaylistModalSearch: document.getElementById('queuePlaylistModalSearch'),
  queuePlaylistModalNewBtn: document.getElementById('queuePlaylistModalNewBtn'),
  queuePlaylistModalList: document.getElementById('queuePlaylistModalList'),
  queueModalAddMode: document.getElementById('queueModalAddMode'),
  addQueueToPlaylistBtn: document.getElementById('addQueueToPlaylistBtn'),
  recentMusicList: document.getElementById('recentMusicList'),
  recentPlaylistList: document.getElementById('recentPlaylistList'),
  monthlyPopularMusicList: document.getElementById('monthlyPopularMusicList'),
  favoriteMusicList: document.getElementById('favoriteMusicList'),
  playAllRecentMusicBtn: document.getElementById('playAllRecentMusicBtn'),
  playAllMonthlyMusicBtn: document.getElementById('playAllMonthlyMusicBtn'),
  playAllFavoriteMusicBtn: document.getElementById('playAllFavoriteMusicBtn'),
  favoritePlaylistList: document.getElementById('favoritePlaylistList'),
  favoriteSongsList: document.getElementById('favoriteSongsList'),
  popularPlaylistList: document.getElementById('popularPlaylistList'),
  myPlaylistList: document.getElementById('myPlaylistList'),
  playlistCount: document.getElementById('playlistCount'),
  homeScreen: document.getElementById('homeScreen'),
  myMusicScreen: document.getElementById('myMusicScreen'),
  favoriteScreen: document.getElementById('favoriteScreen'),
  myMusicMenuList: document.getElementById('myMusicMenuList'),
  favoriteMenuSongsList: document.getElementById('favoriteMenuSongsList'),
  favoriteMenuPlaylistsList: document.getElementById('favoriteMenuPlaylistsList'),
  navHomeBtn: document.getElementById('navHomeBtn'),
  navMyMusicBtn: document.getElementById('navMyMusicBtn'),
  navFavoriteBtn: document.getElementById('navFavoriteBtn'),
  playerModeBadge: document.getElementById('playerModeBadge'),
  playerModeBadgeRight: document.getElementById('playerModeBadgeRight'),
  videoPlayer: document.getElementById('videoPlayer'),
  playerViewport: document.getElementById('playerViewport'),
  playerViewportTitle: document.getElementById('playerViewportTitle'),
  playerViewportArtist: document.getElementById('playerViewportArtist'),
  closePlayerBtn: document.getElementById('closePlayerBtn'),
  expandPlayerBtn: document.getElementById('expandPlayerBtn'),
  currentTime: document.getElementById('currentTime'),
  totalTime: document.getElementById('totalTime'),
  progressBar: document.querySelector('.progress-bar'),
  progressFill: document.getElementById('progressFill'),
  prevBtn: document.getElementById('prevBtn'),
  skipBackBtn: document.getElementById('skipBackBtn'),
  nextBtn: document.getElementById('nextBtn'),
  skipForwardBtn: document.getElementById('skipForwardBtn'),
  playPauseBtn: document.getElementById('playPauseBtn'),
  modeButtons: Array.from(document.querySelectorAll('.mode-btn')),
  authLoadingShell: document.getElementById('authLoadingShell'),
};

const PROFILE_ICONS = {
  music: ['🎧', '🎵', '🎶', '🎼', '🎹', '🎸', '🥁', '🎤', '🎺', '🎷', '🎻', '🔊'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦉', '🦅', '🦋', '🐝', '🐞', '🦗'],
  nature: ['🌙', '☀️', '🌟', '⭐', '✨', '💫', '🌈', '❄️', '🔥', '💧', '🌿', '🍀', '🌺', '🌸', '🌼', '🌻', '🌷', '🌲', '🌳', '🏔️', '🏝️'],
  emoticon: ['😊', '😎', '🤔', '😍', '🥰', '😇', '🤩', '😄', '😁', '😆', '🙂', '🎉', '🎊', '💪', '👍', '🔥'],
  other: ['👑', '💎', '🎯', '🎨', '📚', '🎮', '🏆', '🎭', '🎪', '🎬', '🎲', '🧩', '⚡', '🌀', '🎈', '🎁']
};

const PROFILE_ICON_CATEGORIES = Object.keys(PROFILE_ICONS).map(key => ({
  id: key,
  label: {
    music: '🎵 音楽',
    animals: '🐾 動物',
    nature: '🌿 自然',
    emoticon: '😊 感情',
    other: '✨ その他'
  }[key],
  icons: PROFILE_ICONS[key]
}));

const MODE_LABELS = {
  queue: 'キュー連続再生',
  shuffle: 'キューシャッフル',
  'repeat-one': '1曲繰り返し',
};

const PLAYLIST_ICONS = ['♫', '🎵', '🎶', '🎧', '🎤', '🎸', '🎹', '🥁', '🌙', '⭐', '🔥', '💎', '🌿', '🎮'];

const state = {
  user: null,
  authLoading: true,
  playlists: [],
  favorites: [],
  trackFavorites: [],
  currentPlaylistId: null,
  currentTrackIndex: 0,
  queue: [],
  libraryTracks: [],
  repeatMode: 'queue',
  uploadProgress: 0,
  uploadMessage: '',
  uploading: false,
  supabaseClient: null,
  videoUploadsChannel: null,
  lastPlayedTrack: null,
  playerExpanded: false,
  playerControlsTimer: null,
  progressDragging: false,
  pendingUploadFiles: [],
  renamingPlaylistId: null,
  deletingPlaylistId: null,
  playlistEditDraft: null,
  visibilityConfirmPlaylistId: null,
  visibilityConfirmTrackId: null,
  visibilityConfirmNextIsPublic: null,
  editingTrackId: null,
  activeScreen: 'home',
  uiAuthenticated: false,
  favoriteSongLimit: 5,
  returnToQueuePlaylistModal: false,
  toastTimer: null,
};

function safeParse(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return null;
  }
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function generateRandomNickname() {
  const adjectives = ['Night', 'Star', 'Moon', 'Blue', 'Dream', 'Forest', 'Sun', 'Cloud', 'Velvet', 'Sunny', 'Echo', 'Golden'];
  const nouns = ['Fox', 'Wave', 'Bloom', 'Comet', 'Road', 'River', 'Drum', 'Harbor', 'Nova', 'Muse', 'Spark', 'Jungle'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const suffix = Math.floor(Math.random() * 90) + 10;
  return `${adjective}${noun}${suffix}`;
}

function isSupabaseConfigured() {
  const { url, anonKey } = appConfig.supabase || {};
  return Boolean(url && !url.includes('YOUR_') && anonKey && !anonKey.includes('YOUR_'));
}

function isPersistableSupabaseUser(user = state.user) {
  return Boolean(user?.id && /^[0-9a-fA-F-]{36}$/.test(String(user.id)));
}

function getSupabaseClient() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    return null;
  }

  const { url, anonKey } = appConfig.supabase || {};
  if (!url || url.includes('YOUR_') || !anonKey || anonKey.includes('YOUR_')) {
    return null;
  }

  if (!state.supabaseClient) {
    state.supabaseClient = window.supabase.createClient(url, anonKey);
  }

  return state.supabaseClient;
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

function getUserNickname(user = state.user) {
  if (!user) {
    return 'Guest';
  }

  return user.profile?.nickname || user.nickname || 'Guest';
}

function getUserIcon(user = state.user) {
  if (!user) {
    return '🎧';
  }

  return user.profile?.icon || user.icon || PROFILE_ICONS.music[0];
}

function normalizeUserProfile(user) {
  if (!user) {
    return null;
  }

  const source = user.profile || {};
  const fallbackNickname = generateRandomNickname();
  const nicknameSource = source.nickname || user.nickname || fallbackNickname;
  const profile = {
    nickname: (nicknameSource || fallbackNickname).trim() || fallbackNickname,
    details: source.details || user.details || '',
    icon: source.icon || user.icon || PROFILE_ICONS[Math.floor(Math.random() * PROFILE_ICONS.length)],
  };

  return {
    ...user,
    id: user.id || state.user?.id || null,
    name: profile.nickname,
    nickname: profile.nickname,
    details: profile.details,
    icon: profile.icon,
    profile,
  };
}

function ensureRandomNicknameForUser(user) {
  if (!user) {
    return null;
  }

  const normalized = normalizeUserProfile(user);
  const existingNickname = (normalized.profile?.nickname || normalized.nickname || normalized.name || '').trim();
  const nextNickname = existingNickname || generateRandomNickname();

  normalized.profile = {
    ...normalized.profile,
    nickname: nextNickname,
  };
  normalized.nickname = nextNickname;
  normalized.name = nextNickname;

  return normalized;
}

function applyUserProfile(user) {
  if (!user) {
    state.user = null;
    return;
  }

  state.user = ensureRandomNicknameForUser(user);
}

function loadStateFromLocal() {
  state.user = null;
  state.playlists = [];
  state.favorites = [];
  state.currentPlaylistId = null;
  state.queue = [];
  state.libraryTracks = [];
}

function saveLocalState() {
  return;
}

function ensureSeedPlaylists() {
  if (state.playlists.length > 0) {
    return;
  }

  state.playlists = [];
  state.currentPlaylistId = null;
  state.queue = [];
  state.libraryTracks = [];
  saveLocalState();
}

function formatDateLabel(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}

function formatDateTimeLabel(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${formatDateLabel(value)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function buildCloudinaryThumbnailUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') {
    return null;
  }

  const normalized = fileUrl.trim();
  if (!normalized) {
    return null;
  }

  const deduplicated = normalized
    .replace(/(\/so_0,w_640,h_360,c_fit)\/\1\//i, '$1/')
    .replace(/(\.(?:jpg|jpeg|png|webp|gif|avif))\1$/i, '$1');
  if (deduplicated !== normalized) {
    return deduplicated;
  }

  if (normalized.includes('/image/upload/') && (normalized.includes('/c_fill,') || /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?|$)/i.test(normalized))) {
    return normalized;
  }

  if (normalized.includes('/video/upload/') && /\/(?:so_\d+,)?w_\d+,h_\d+,c_(?:fit|fill)\/.*\.(jpg|jpeg|png|webp|gif|avif)(?:\?|$)/i.test(normalized)) {
    return normalized;
  }

  if (normalized.includes('/video/upload/')) {
    if (normalized.includes('c_fill')) {
      return normalized
        .replace(/w_\d+,h_\d+/i, 'w_640,h_360')
        .replace(/c_fill/i, 'c_fit');
    }

    const uploadIndex = normalized.indexOf('/upload/');
    if (uploadIndex < 0) {
      return normalized;
    }

    const assetPath = normalized.slice(uploadIndex + '/upload/'.length).replace(/\?.*$/, '');
    if (!assetPath) {
      return normalized;
    }

    const cleanedAssetPath = assetPath.replace(/\.(mp4|mov|webm|m4v|avi|mkv)(\?.*)?$/i, '');
    const prefix = normalized.slice(0, uploadIndex + '/upload/'.length);
    return `${prefix}so_0,w_640,h_360,c_fit/${cleanedAssetPath}.jpg`;
  }

  if (normalized.includes('/upload/')) {
    const uploadIndex = normalized.indexOf('/upload/');
    if (uploadIndex >= 0) {
      return `${normalized.slice(0, uploadIndex + '/upload/'.length)}c_fit,w_640,h_360/${normalized.slice(uploadIndex + '/upload/'.length)}`;
    }
  }

  return normalized;
}

function buildPlayableVideoUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string' || !fileUrl.includes('/video/upload/')) {
    return fileUrl;
  }

  if (!/\.webm(?:\?|$)/i.test(fileUrl)) {
    return fileUrl;
  }

  return fileUrl
    .replace('/video/upload/', '/video/upload/f_mp4/')
    .replace(/\.webm(\?|$)/i, '.mp4$1');
}

function renderMusicList(element, tracks, emptyMessage, { showPlayCount = false, showFavoriteCount = false } = {}) {
  if (!element) {
    return;
  }

  if (!tracks.length) {
    element.innerHTML = `
      <div class="mini-card">
        <span class="mini-cover">♪</span>
        <div>
          <strong>${emptyMessage.title}</strong>
          <small>${emptyMessage.description}</small>
        </div>
      </div>
    `;
    return;
  }

  element.innerHTML = tracks
    .map((track) => {
      const createdDate = formatDateLabel(track.createdAt || track.created_at);
      const thumbnailStyle = track.thumbnail
        ? `style="background-image: url('${track.thumbnail}'); background-size: cover; background-position: center; background-repeat: no-repeat;"`
        : '';
      const coverSymbol = track.thumbnail ? '' : '♪';
      const metric = showPlayCount
        ? ` · 再生 ${Number(track.playCount) || 0}回`
        : showFavoriteCount
          ? ` · お気に入り ${Number(track.favoriteCount) || 0}件`
          : '';
      return `
        <button class="music-card ${track.id === state.queue[state.currentTrackIndex]?.id ? 'selected' : ''}" type="button" data-track-id="${track.id}">
          <span class="cover" ${thumbnailStyle}>${coverSymbol}</span>
          <span class="music-info">
            <strong>${track.title}</strong>
            <small>${createdDate || '-'} <span class="poster-trigger" data-owner-id="${track.ownerId || ''}" role="button" tabindex="0" aria-label="${track.artist || '投稿者'}のプロフィールを表示"><span class="poster-icon" aria-hidden="true">${track.artistIcon || '🎧'}</span> ${track.artist || '匿名アカウント'}</span>${metric}</small>
          </span>
        </button>
      `;
    })
    .join('');

  element.querySelectorAll('.music-card').forEach((button) => {
    button.addEventListener('click', () => {
      const track = tracks.find((item) => String(item.id) === button.dataset.trackId);
      addTrackToQueueAndPlay(track);
    });
  });

  element.querySelectorAll('.poster-trigger').forEach((trigger) => {
    const openProfile = (event) => {
      event.stopPropagation();
      const track = tracks.find((item) => String(item.id) === trigger.closest('.music-card')?.dataset.trackId);
      openPublicProfileModal(track);
    };
    trigger.addEventListener('click', openProfile);
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProfile(event);
      }
    });
  });
}

function isWithinLast30Days(dateValue) {
  const value = new Date(dateValue || 0).getTime();
  if (Number.isNaN(value)) {
    return false;
  }

  const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
  return value >= cutoff;
}

function isVisibleRecentPlaylist(playlist) {
  if (!playlist) {
    return false;
  }

  const createdAt = Number(playlist.createdAt ?? playlist.created_at ?? 0);
  if (!isWithinLast30Days(createdAt)) {
    return false;
  }

  if (playlist.isPublic) {
    return true;
  }

  return Boolean(state.user?.id) && playlist.ownerId === state.user.id;
}

function renderRecentMusic() {
  const tracks = (Array.isArray(state.libraryTracks) ? state.libraryTracks : []).filter((track) => isWithinLast30Days(track.createdAt || track.created_at));
  syncEmptyCloudState();
  renderMusicList(elements.recentMusicList, tracks, {
    title: '公開中の音楽がありません',
    description: 'クラウドの音楽が反映されるまで少し待ってください',
  });
  renderMonthlyPopularMusic();
  renderFavoriteMusic();
  renderMusicList(elements.anonymousMusicList, tracks, {
    title: '公開中の音楽がありません',
    description: '公開された音楽がここに表示されます',
  });
  elements.anonymousMusicPanel?.classList.toggle('hidden', !tracks.length);
}

function renderTopSearchResults() {
  if (!elements.topSearchInput || !elements.topSearchResults) {
    return;
  }

  const query = elements.topSearchInput.value.trim().normalize('NFKC').toLowerCase();
  if (!query) {
    elements.topSearchResults.classList.add('hidden');
    elements.topSearchResults.innerHTML = '';
    return;
  }

  const tracks = (Array.isArray(state.libraryTracks) ? state.libraryTracks : []).filter((track) => {
    const searchable = [track.title, track.artist, track.genre, track.description]
      .filter(Boolean)
      .join(' ')
      .normalize('NFKC')
      .toLowerCase();
    return searchable.includes(query);
  });
  const playlists = (Array.isArray(state.playlists) ? state.playlists : []).filter((playlist) => {
    if (!playlist.isPublic) {
      return false;
    }
    const searchable = [playlist.name, playlist.description]
      .filter(Boolean)
      .join(' ')
      .normalize('NFKC')
      .toLowerCase();
    return searchable.includes(query);
  });

  elements.topSearchResults.classList.remove('hidden');
  if (!tracks.length && !playlists.length) {
    elements.topSearchResults.innerHTML = '<p class="top-search-empty">該当する音楽・プレイリストがありません</p>';
    return;
  }

  elements.topSearchResults.innerHTML = `
    <div class="top-search-results-head">
      <strong>検索結果</strong>
      <span>${tracks.length + playlists.length}件</span>
    </div>
    ${tracks.length ? `<strong class="top-search-section-title">音楽</strong><div class="top-search-results-list">
      ${tracks.map((track) => `
        <button class="top-search-result" type="button" data-search-track-id="${track.id}">
          <span class="top-search-result-cover" ${track.thumbnail ? `style="background-image: url('${track.thumbnail}'); background-size: cover; background-position: center;"` : ''}>${track.thumbnail ? '' : '♪'}</span>
          <span class="top-search-result-info">
            <strong>${track.title}</strong>
            <small>${formatDateLabel(track.createdAt) || '-'} · <span class="top-search-result-artist-icon" aria-hidden="true">${track.artistIcon || '🎧'}</span> ${track.artist || '匿名アカウント'}</small>
          </span>
          <span class="top-search-result-play" aria-hidden="true">▶</span>
        </button>
      `).join('')}
    </div>` : ''}
    ${playlists.length ? `<strong class="top-search-section-title">公開プレイリスト</strong><div class="top-search-results-list">
      ${playlists.map((playlist) => `
        <button class="top-search-result" type="button" data-search-playlist-id="${playlist.id}">
          <span class="top-search-result-cover">${playlist.icon || '♫'}</span>
          <span class="top-search-result-info">
            <strong>${playlist.name}</strong>
            <small>公開プレイリスト · ${playlist.items?.length || 0}曲</small>
          </span>
          <span class="top-search-result-play" aria-hidden="true">▶</span>
        </button>
      `).join('')}
    </div>` : ''}
  `;

  elements.topSearchResults.querySelectorAll('[data-search-track-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const track = tracks.find((item) => String(item.id) === button.dataset.searchTrackId);
      addTrackToQueueAndPlay(track);
      elements.topSearchResults.classList.add('hidden');
    });
  });
  elements.topSearchResults.querySelectorAll('[data-search-playlist-id]').forEach((button) => {
    button.addEventListener('click', () => {
      addPlaylistToQueue(button.dataset.searchPlaylistId);
      elements.topSearchResults.classList.add('hidden');
    });
  });
}

function renderMonthlyPopularMusic() {
  const tracks = getMonthlyPopularTracks();
  renderMusicList(elements.monthlyPopularMusicList, tracks, {
    title: '30日以内の再生データがありません',
    description: '再生回数が多い音楽がここに表示されます',
  }, { showPlayCount: true });
}

function getMonthlyPopularTracks() {
  return (Array.isArray(state.libraryTracks) ? state.libraryTracks : [])
    .filter((track) => isWithinLast30Days(track.createdAt || track.created_at) && (Number(track.playCount) || 0) > 0)
    .sort((left, right) => (Number(right.playCount) || 0) - (Number(left.playCount) || 0))
    .slice(0, 5);
}

function renderFavoriteMusic() {
  const tracks = getFavoriteMusicTracks();
  renderMusicList(elements.favoriteMusicList, tracks, {
    title: 'お気に入りの音楽がありません',
    description: '',
  }, { showFavoriteCount: true });
  renderFavoriteSongs();
}

function getFavoriteMusicTracks() {
  return (Array.isArray(state.libraryTracks) ? state.libraryTracks : [])
    .filter((track) => (Number(track.favoriteCount) || 0) > 0)
    .slice()
    .sort((left, right) => (Number(right.favoriteCount) || 0) - (Number(left.favoriteCount) || 0))
    .slice(0, 5);
}

function getFavoriteSongTracks() {
  const favoriteIds = new Set((Array.isArray(state.trackFavorites) ? state.trackFavorites : []).map((id) => String(id)));
  return (Array.isArray(state.libraryTracks) ? state.libraryTracks : [])
    .filter((track) => favoriteIds.has(String(track.id)))
    .slice()
    .sort((left, right) => (Number(right.favoriteCount) || 0) - (Number(left.favoriteCount) || 0));
}

function getFavoriteSongsPlaylist() {
  return {
    id: 'favorite-songs',
    name: 'お気に入り曲',
    icon: '★',
    items: getFavoriteSongTracks(),
    ownerId: 'system',
    ownerName: '全ユーザー',
    ownerIcon: '★',
    isPublic: true,
    createdAt: 0,
    synthetic: true,
  };
}

function getSelectablePlaylists() {
  return [getFavoriteSongsPlaylist(), ...(Array.isArray(state.playlists) ? state.playlists : [])];
}

function getOwnedPlaylistsForManagement() {
  if (!state.user?.id) {
    return [];
  }

  return (Array.isArray(state.playlists) ? state.playlists : []).filter((playlist) => playlist.ownerId === state.user.id);
}

function renderFavoriteSongs() {
  if (!elements.favoriteSongsList) {
    return;
  }

  const tracks = getFavoriteSongTracks();
  const visibleTracks = tracks.slice(0, Math.max(1, state.favoriteSongLimit || 5));

  if (!tracks.length) {
    elements.favoriteSongsList.innerHTML = `
      <div class="mini-card">
        <span class="mini-cover">★</span>
        <div>
          <strong>お気に入りの曲がありません</strong>
        </div>
      </div>
    `;
    return;
  }

  elements.favoriteSongsList.innerHTML = visibleTracks
    .map((track) => {
      const thumbnailStyle = track.thumbnail
        ? `style="background-image: url('${String(track.thumbnail).replace(/'/g, "\\'")}'); background-size: cover; background-position: center; background-repeat: no-repeat;"`
        : '';
      const isFavorite = state.trackFavorites.includes(track.id);

      return `
        <div class="favorite-song-item favorite-song-card" data-favorite-song-id="${track.id || ''}" tabindex="0" role="button" aria-label="${track.title || 'Untitled track'}を再生">
          <div class="favorite-song-main">
            <span class="favorite-song-cover" ${thumbnailStyle}>${track.thumbnail ? '' : '♪'}</span>
            <span class="favorite-song-copy">
              <strong>${track.title || 'Untitled track'}</strong>
            </span>
          </div>
          <div class="favorite-song-meta">
            <small class="favorite-song-author"><span class="favorite-song-author-icon" aria-hidden="true">${track.artistIcon || '🎧'}</span> ${track.artist || '匿名アカウント'}</small>
            <div class="favorite-song-actions">
              <button type="button" class="row-action playlist-favorite-action ${isFavorite ? 'is-favorite' : ''}" data-favorite-song-action="favorite" data-track-id="${track.id || ''}">${isFavorite ? '☆お気に入り曲から解除' : '★お気に入り曲に追加'}</button>
              <button type="button" class="row-action" data-favorite-song-action="share" data-track-id="${track.id || ''}">共有</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  if (tracks.length > visibleTracks.length) {
    const moreRow = document.createElement('button');
    moreRow.type = 'button';
    moreRow.className = 'sidebar-more-btn';
    moreRow.textContent = 'さらに表示';
    moreRow.addEventListener('click', () => {
      state.favoriteSongLimit += 5;
      renderFavoriteSongs();
    });
    elements.favoriteSongsList.appendChild(moreRow);
  }

  elements.favoriteSongsList.querySelectorAll('[data-favorite-song-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const trackId = button.dataset.trackId;
      const track = state.libraryTracks.find((item) => String(item.id) === String(trackId));
      if (!track) {
        return;
      }

      const action = button.dataset.favoriteSongAction;
      if (action === 'favorite') {
        toggleTrackFavorite(track);
      }
      if (action === 'share') {
        shareTrack(track);
      }
    });
  });

  elements.favoriteSongsList.querySelectorAll('.favorite-song-card').forEach((card) => {
    card.addEventListener('click', () => {
      const trackId = card.dataset.favoriteSongId;
      const track = state.libraryTracks.find((item) => String(item.id) === String(trackId));
      if (track) {
        addTrackToQueueAndPlay(track);
      }
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const trackId = card.dataset.favoriteSongId;
        const track = state.libraryTracks.find((item) => String(item.id) === String(trackId));
        if (track) {
          addTrackToQueueAndPlay(track);
        }
      }
    });
  });
}

function queueTracksAndPlay(tracks) {
  if (!tracks.length) {
    showAppToast('再生できる音楽がありません', 'error');
    return;
  }

  const uniqueTracks = tracks.filter((track, index, items) => {
    const key = `${track.id || ''}|${track.src || ''}`;
    return items.findIndex((item) => `${item.id || ''}|${item.src || ''}` === key) === index;
  });
  state.queue = uniqueTracks.map((track) => ({ ...track }));
  state.currentTrackIndex = 0;
  renderQueue();
  loadTrack(0, true);
  showAppToast(`${uniqueTracks.length}曲をキューに追加しました`, 'success');
}

function renderFavoritePlaylists() {
  if (!elements.favoritePlaylistList) {
    return;
  }

  const favorites = state.playlists.filter((playlist) => state.favorites.includes(playlist.id));

  if (!favorites.length) {
    elements.favoritePlaylistList.innerHTML = `
      <div class="mini-card">
        <span class="mini-cover">★</span>
        <div>
          <strong>お気に入りがありません</strong>
        </div>
      </div>
    `;
    renderPopularPlaylists();
    return;
  }

  elements.favoritePlaylistList.innerHTML = favorites
    .map((playlist) => `
      <div class="mini-card playlist-card-trigger" data-playlist-id="${playlist.id}" tabindex="0" role="button" aria-label="${playlist.name}を再生">
        <div class="favorite-playlist-main">
          <span class="mini-cover">${playlist.icon || '♫'}</span>
          <div class="favorite-playlist-copy">
            <strong>${playlist.name}</strong>
            <div class="favorite-playlist-meta">
              <small>${playlist.items?.length || 0}曲</small>
              <small class="playlist-owner"><span aria-hidden="true">${playlist.ownerIcon || '🎧'}</span> ${playlist.ownerName || '匿名アカウント'}</small>
            </div>
          </div>
        </div>
        <div class="favorite-playlist-actions">
          <button class="row-action playlist-favorite-action is-favorite" type="button" data-favorite-playlist-action="favorite" data-playlist-id="${playlist.id}">☆解除</button>
          <button class="row-action" type="button" data-favorite-playlist-action="share" data-playlist-id="${playlist.id}">共有</button>
        </div>
      </div>
    `)
    .join('');

  elements.favoritePlaylistList.querySelectorAll('[data-favorite-playlist-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const playlistId = button.dataset.playlistId;
      const action = button.dataset.favoritePlaylistAction;
      if (action === 'favorite') toggleFavorite(playlistId);
      if (action === 'share') sharePlaylist(playlistId);
    });
  });

  elements.favoritePlaylistList.querySelectorAll('.playlist-card-trigger').forEach((card) => {
    card.addEventListener('click', () => addPlaylistToQueue(card.dataset.playlistId));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        addPlaylistToQueue(card.dataset.playlistId);
      }
    });
  });

  renderFavoriteSongs();
  renderPopularPlaylists();
}

function renderRecentPlaylists() {
  if (!elements.recentPlaylistList) {
    return;
  }

  if (!state.playlistsLoading && !state.playlists.length && !state.user) {
    loadSupabasePlaylists().catch((error) => {
      logAppError('recent playlist refresh failed', error);
    });
  }

  const playlists = (Array.isArray(state.playlists) ? state.playlists : [])
    .filter((playlist) => isVisibleRecentPlaylist(playlist))
    .slice()
    .sort((left, right) => (Number(right.createdAt ?? right.created_at ?? 0) || 0) - (Number(left.createdAt ?? left.created_at ?? 0) || 0));

  if (!playlists.length) {
    elements.recentPlaylistList.innerHTML = '<div class="mini-card"><span class="mini-cover">♫</span><div><strong>プレイリストがありません</strong></div></div>';
    return;
  }

  elements.recentPlaylistList.innerHTML = playlists.map((playlist) => {
    const isFavorite = state.user && state.favorites.includes(playlist.id);
    return `
      <div class="mini-card playlist-card-trigger" data-playlist-id="${playlist.id}" tabindex="0" role="button" aria-label="${playlist.name}を再生">
        <div class="favorite-playlist-main">
          <span class="mini-cover">${playlist.icon || '♫'}</span>
          <div class="favorite-playlist-copy">
            <strong>${playlist.name}</strong>
            <div class="favorite-playlist-meta">
              <small>${playlist.items?.length || 0}曲</small>
              <small class="playlist-owner"><span aria-hidden="true">${playlist.ownerIcon || '🎧'}</span> ${playlist.ownerName || '匿名アカウント'}</small>
              <small>${formatDateLabel(playlist.createdAt || new Date().toISOString())}</small>
            </div>
          </div>
        </div>
        ${state.user ? `<button type="button" class="row-action playlist-favorite-action ${isFavorite ? 'is-favorite' : ''}" data-favorite-playlist-action="favorite" data-playlist-id="${playlist.id}">${isFavorite ? '☆解除' : '★追加'}</button>` : ''}
      </div>
    `;
  }).join('');

  elements.recentPlaylistList.querySelectorAll('.playlist-card-trigger').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-favorite-playlist-action]')) {
        return;
      }
      addPlaylistToQueue(card.dataset.playlistId);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (event.target.closest('[data-favorite-playlist-action]')) {
          return;
        }
        addPlaylistToQueue(card.dataset.playlistId);
      }
    });
  });

  elements.recentPlaylistList.querySelectorAll('[data-favorite-playlist-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleFavorite(button.dataset.playlistId);
    });
  });
}

async function refreshPlaylistFavoriteCountsFromSupabase(playlists = state.playlists) {
  const client = getSupabaseClient();
  if (!client || !Array.isArray(playlists) || !playlists.length) {
    return;
  }

  const { data, error } = await client
    .from('favorite_playlists')
    .select('playlist_id');

  if (error) {
    logAppError('favorite playlist counts refresh failed', error);
    return;
  }

  const favoriteCounts = (data || []).reduce((counts, row) => {
    const playlistId = row.playlist_id;
    counts[playlistId] = (counts[playlistId] || 0) + 1;
    return counts;
  }, {});

  playlists.forEach((playlist) => {
    playlist.favoriteCount = Number(favoriteCounts[playlist.id] || 0);
  });
}

function renderPopularPlaylists() {
  if (!elements.popularPlaylistList) {
    return;
  }

  const playlists = (Array.isArray(state.playlists) ? state.playlists : [])
    .filter((playlist) => playlist.isPublic && (Number(playlist.favoriteCount) || 0) > 0)
    .slice()
    .sort((left, right) => (Number(right.favoriteCount) || 0) - (Number(left.favoriteCount) || 0))
    .slice(0, 5);

  if (!playlists.length) {
    elements.popularPlaylistList.innerHTML = '<div class="mini-card"><span class="mini-cover">★</span><div><strong>プレイリストがありません</strong></div></div>';
    return;
  }

  elements.popularPlaylistList.innerHTML = playlists.map((playlist) => {
    const isFavorite = state.user && state.favorites.includes(playlist.id);
    return `
      <div class="mini-card playlist-card-trigger" data-playlist-id="${playlist.id}" tabindex="0" role="button" aria-label="${playlist.name}を再生">
        <div class="favorite-playlist-main">
          <span class="mini-cover">${playlist.icon || '♫'}</span>
          <div class="favorite-playlist-copy">
            <strong>${playlist.name}</strong>
            <div class="favorite-playlist-meta">
              <small>${playlist.items?.length || 0}曲</small>
              <small class="playlist-owner"><span aria-hidden="true">${playlist.ownerIcon || '🎧'}</span> ${playlist.ownerName || '匿名アカウント'}</small>
              <small>★ ${Number(playlist.favoriteCount) || 0}</small>
            </div>
          </div>
        </div>
        ${state.user ? `<button type="button" class="row-action playlist-favorite-action ${isFavorite ? 'is-favorite' : ''}" data-favorite-playlist-action="favorite" data-playlist-id="${playlist.id}">${isFavorite ? '☆解除' : '★追加'}</button>` : ''}
      </div>
    `;
  }).join('');

  elements.popularPlaylistList.querySelectorAll('.playlist-card-trigger').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-favorite-playlist-action]')) {
        return;
      }
      addPlaylistToQueue(card.dataset.playlistId);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (event.target.closest('[data-favorite-playlist-action]')) {
          return;
        }
        addPlaylistToQueue(card.dataset.playlistId);
      }
    });
  });

  elements.popularPlaylistList.querySelectorAll('[data-favorite-playlist-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleFavorite(button.dataset.playlistId);
    });
  });
}

function renderMyMusicMenu() {
  if (!elements.myMusicMenuList) {
    return;
  }

  restoreActiveScreen();

  const currentUserId = state.user?.id ? String(state.user.id) : '';
  const tracks = (Array.isArray(state.libraryTracks) ? state.libraryTracks : [])
    .filter((track) => {
      if (!currentUserId) {
        return false;
      }
      return String(track.ownerId || '') === currentUserId;
    })
    .slice()
    .sort((left, right) => (Number(right.createdAt) || 0) - (Number(left.createdAt) || 0));

  if (!tracks.length) {
    elements.myMusicMenuList.innerHTML = '<div class="mini-card"><span class="mini-cover">♫</span><div><strong>アップロードした音楽がありません</strong></div></div>';
    return;
  }

  elements.myMusicMenuList.innerHTML = tracks.map((track) => {
    const isFavorite = state.trackFavorites.includes(track.id);
    const isPublic = Boolean(track.isPublic !== false);
    const postedOn = track.createdAt ? formatDateLabel(track.createdAt) : '日付不明';

    return `
      <div class="music-card" data-track-id="${track.id}" tabindex="0" role="button" aria-label="${track.title}を再生">
        <span class="music-cover" ${track.thumbnail ? `style="background-image: url('${String(track.thumbnail).replace(/'/g, "\\'")}'); background-size: cover; background-position: center; background-repeat: no-repeat;"` : ''}>${track.thumbnail ? '' : '♪'}</span>
        <div class="music-copy">
          <strong>${track.title || 'Untitled track'}</strong>
          <small>投稿日: ${postedOn}</small>
        </div>
        <div class="music-card-actions">
          <button type="button" class="row-action" data-track-action="edit" data-track-id="${track.id}">編集</button>
          <button type="button" class="row-action playlist-favorite-action ${isFavorite ? 'is-favorite' : ''}" data-track-favorite-action="favorite" data-track-id="${track.id}">${isFavorite ? '☆解除' : '★追加'}</button>
          <button type="button" class="row-action playlist-visibility-action ${isPublic ? 'is-public' : 'is-private'}" data-track-action="toggle-public" data-track-id="${track.id}">${isPublic ? '公開済' : '非公開済'}</button>
          <button type="button" class="row-action" data-track-action="share" data-track-id="${track.id}">共有</button>
          <button type="button" class="row-action danger-action" data-track-action="delete" data-track-id="${track.id}">削除</button>
        </div>
      </div>
    `;
  }).join('');

  elements.myMusicMenuList.querySelectorAll('.music-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-track-favorite-action]') || event.target.closest('[data-track-action]')) {
        return;
      }
      const track = tracks.find((item) => String(item.id) === card.dataset.trackId);
      if (track) {
        addTrackToQueueAndPlay(track);
      }
    });
  });

  elements.myMusicMenuList.querySelectorAll('[data-track-favorite-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const track = tracks.find((item) => String(item.id) === button.dataset.trackId);
      if (track) {
        toggleTrackFavorite(track);
      }
    });
  });

  elements.myMusicMenuList.querySelectorAll('[data-track-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const track = tracks.find((item) => String(item.id) === button.dataset.trackId);
      if (!track) {
        return;
      }

      const action = button.dataset.trackAction;
      if (action === 'edit') {
        openTrackEditModal(track);
      }
      if (action === 'toggle-public') {
        toggleTrackPublic(track);
      }
      if (action === 'share') {
        shareTrack(track);
      }
      if (action === 'delete') {
        deleteTrack(track);
      }
    });
  });
}

function renderFavoriteMenu() {
  if (!elements.favoriteMenuSongsList || !elements.favoriteMenuPlaylistsList) {
    return;
  }

  restoreActiveScreen();

  const favoriteTracks = getFavoriteSongTracks();
  if (!favoriteTracks.length) {
    elements.favoriteMenuSongsList.innerHTML = '<div class="mini-card"><span class="mini-cover">★</span><div><strong>お気に入りの曲がありません</strong></div></div>';
  } else {
    elements.favoriteMenuSongsList.innerHTML = favoriteTracks.map((track) => `
      <div class="music-card" data-track-id="${track.id}" tabindex="0" role="button" aria-label="${track.title}を再生">
        <span class="music-cover" ${track.thumbnail ? `style="background-image: url('${String(track.thumbnail).replace(/'/g, "\\'")}'); background-size: cover; background-position: center; background-repeat: no-repeat;"` : ''}>${track.thumbnail ? '' : '♪'}</span>
        <div class="music-copy">
          <strong>${track.title || 'Untitled track'}</strong>
          <small>${track.artist || '匿名アカウント'}</small>
        </div>
        <button type="button" class="row-action playlist-favorite-action is-favorite" data-track-favorite-action="favorite" data-track-id="${track.id}">☆解除</button>
      </div>
    `).join('');

    elements.favoriteMenuSongsList.querySelectorAll('.music-card').forEach((card) => {
      card.addEventListener('click', (event) => {
        if (event.target.closest('[data-track-favorite-action]')) {
          return;
        }
        const track = favoriteTracks.find((item) => String(item.id) === card.dataset.trackId);
        if (track) {
          addTrackToQueueAndPlay(track);
        }
      });
    });

    elements.favoriteMenuSongsList.querySelectorAll('[data-track-favorite-action]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const track = favoriteTracks.find((item) => String(item.id) === button.dataset.trackId);
        if (track) {
          toggleTrackFavorite(track);
        }
      });
    });
  }

  const favoritePlaylists = (Array.isArray(state.playlists) ? state.playlists : []).filter((playlist) => state.favorites.includes(playlist.id));
  if (!favoritePlaylists.length) {
    elements.favoriteMenuPlaylistsList.innerHTML = '<div class="mini-card"><span class="mini-cover">★</span><div><strong>お気に入りのプレイリストがありません</strong></div></div>';
    return;
  }

  elements.favoriteMenuPlaylistsList.innerHTML = favoritePlaylists.map((playlist) => `
    <div class="mini-card playlist-card-trigger" data-playlist-id="${playlist.id}" tabindex="0" role="button" aria-label="${playlist.name}を再生">
      <div class="favorite-playlist-main">
        <span class="mini-cover">${playlist.icon || '♫'}</span>
        <div class="favorite-playlist-copy">
          <strong>${playlist.name}</strong>
          <div class="favorite-playlist-meta">
            <small>${playlist.items?.length || 0}曲</small>
            <small class="playlist-owner"><span aria-hidden="true">${playlist.ownerIcon || '🎧'}</span> ${playlist.ownerName || '匿名アカウント'}</small>
          </div>
        </div>
      </div>
      <div class="favorite-playlist-actions">
        <button class="row-action playlist-favorite-action is-favorite" type="button" data-favorite-playlist-action="favorite" data-playlist-id="${playlist.id}">☆解除</button>
        <button class="row-action" type="button" data-favorite-playlist-action="share" data-playlist-id="${playlist.id}">共有</button>
      </div>
    </div>
  `).join('');

  elements.favoriteMenuPlaylistsList.querySelectorAll('[data-favorite-playlist-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const playlistId = button.dataset.playlistId;
      if (button.dataset.favoritePlaylistAction === 'favorite') {
        toggleFavorite(playlistId);
      }
      if (button.dataset.favoritePlaylistAction === 'share') {
        sharePlaylist(playlistId);
      }
    });
  });

  elements.favoriteMenuPlaylistsList.querySelectorAll('.playlist-card-trigger').forEach((card) => {
    card.addEventListener('click', () => addPlaylistToQueue(card.dataset.playlistId));
  });
}

function renderMyPlaylists() {
  if (!elements.myPlaylistList || !elements.playlistCount) {
    return;
  }

  if (!state.user) {
    elements.myPlaylistList.innerHTML = `
      <div class="locked-box">
        <strong>匿名アカウントで利用中</strong>
        <p>ログインするとマイプレイリスト作成ができます。</p>
      </div>
    `;
    elements.playlistCount.textContent = '0件';
    return;
  }

  const favoriteSongsPlaylist = getFavoriteSongsPlaylist();
  const myPlaylists = [favoriteSongsPlaylist, ...state.playlists.filter((playlist) => playlist.ownerId === state.user.id)];
  elements.myPlaylistList.innerHTML = myPlaylists
    .map((playlist) => {
      const isFavorite = playlist.synthetic ? true : state.favorites.includes(playlist.id);
      const isSynthetic = Boolean(playlist.synthetic);
      const rowActions = isSynthetic
        ? `
          <button type="button" class="row-action" data-action="clear-favorites" data-playlist-id="favorite-songs">クリア</button>
        `
        : `
          <button type="button" class="row-action playlist-favorite-action ${isFavorite ? 'is-favorite' : ''}" data-action="favorite" data-playlist-id="${playlist.id}">${isFavorite ? '☆解除' : '★追加'}</button>
          <button type="button" class="row-action playlist-visibility-action ${playlist.isPublic ? 'is-public' : 'is-private'}" data-action="toggle-public" data-playlist-id="${playlist.id}">${playlist.isPublic ? '公開済' : '非公開済'}</button>
          <button type="button" class="row-action" data-action="share" data-playlist-id="${playlist.id}">共有</button>
          <button type="button" class="row-action danger-action" data-action="delete" data-playlist-id="${playlist.id}">削除</button>
        `;

      const favoriteMeta = !isSynthetic && playlist.isPublic
        ? `<small>獲得お気に入り数：${Number(playlist.favoriteCount) || 0}</small>`
        : '';

      return `
        <div class="playlist-row playlist-card-trigger" data-playlist-id="${playlist.id}" tabindex="0" role="button" aria-label="${playlist.name}を再生">
          <div class="playlist-meta">
            <span class="playlist-icon">${playlist.icon || '♫'}</span>
            <div>
              <strong>${playlist.name}</strong>
              <small>${playlist.items?.length || 0}曲</small>
              ${favoriteMeta}
            </div>
          </div>
          <div class="playlist-actions">
            ${rowActions}
          </div>
        </div>
      `;
    })
    .join('');

  elements.playlistCount.textContent = `${myPlaylists.length}件`;
  renderRecentPlaylists();
  renderPopularPlaylists();

  elements.myPlaylistList.querySelectorAll('.row-action').forEach((button) => {
    button.addEventListener('click', (event) => {
      const action = button.dataset.action;
      const playlistId = button.dataset.playlistId;
      const playlist = state.playlists.find((p) => p.id === playlistId);

      if (action === 'clear-favorites') {
        event.stopPropagation();
        clearAllFavoriteSongs();
        return;
      }

      if (!playlist) {
        return;
      }

      event.stopPropagation();

      if (action === 'favorite') {
        toggleFavorite(playlistId);
      }

      if (action === 'toggle-public') {
        togglePlaylistPublic(playlistId);
      }

      if (action === 'share') {
        sharePlaylist(playlistId);
      }

      if (action === 'delete') {
        openPlaylistDeleteModal(playlistId);
      }
    });
  });

  elements.myPlaylistList.querySelectorAll('.playlist-card-trigger').forEach((card) => {
    card.addEventListener('click', () => addPlaylistToQueue(card.dataset.playlistId));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        addPlaylistToQueue(card.dataset.playlistId);
      }
    });
  });
}

function getSelectedPlaylistIds(container) {
  if (!container) {
    return [];
  }

  if (container.tagName === 'SELECT') {
    return Array.from(container.selectedOptions || []).map((option) => option.value).filter(Boolean);
  }

  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value).filter(Boolean);
}

function setSelectedPlaylistIds(container, values) {
  if (!container) {
    return;
  }

  const selected = new Set((values || []).filter(Boolean));
  if (container.tagName === 'SELECT') {
    Array.from(container.options).forEach((option) => {
      option.selected = selected.has(option.value);
    });
    return;
  }

  Array.from(container.querySelectorAll('input[type="checkbox"]')).forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function addSelectedPlaylistId(container, playlistId) {
  if (!container || !playlistId) {
    return;
  }

  const selectedIds = getSelectedPlaylistIds(container);
  if (!selectedIds.includes(playlistId)) {
    selectedIds.push(playlistId);
  }
  setSelectedPlaylistIds(container, selectedIds);
}

function renderPlaylistCheckboxList(container, playlists, selectedValues, emptyLabel) {
  if (!container) {
    return;
  }

  const selectedSet = new Set((selectedValues || []).filter(Boolean));
  if (!playlists.length) {
    container.innerHTML = `<span class="playlist-checkbox-empty">${emptyLabel}</span>`;
    return;
  }

  container.innerHTML = playlists.map((playlist) => `
    <label class="playlist-checkbox-option">
      <input type="checkbox" value="${playlist.id}" ${selectedSet.has(playlist.id) ? 'checked' : ''} />
      <span>${playlist.icon || '♫'} ${playlist.name}</span>
    </label>
  `).join('');
}

function renderUploadPlaylistOptions() {
  if (!elements.uploadPlaylistSelect) {
    renderQueuePlaylistOptions();
    return;
  }

  const selectedValues = getSelectedPlaylistIds(elements.uploadPlaylistSelect);
  const sortMode = elements.uploadPlaylistSort?.value || 'created-desc';
  const query = String(elements.uploadPlaylistSearch?.value || '').trim().toLowerCase();
  const playlists = getOwnedPlaylistsForManagement()
    .filter((playlist) => !query || playlist.name.toLowerCase().includes(query))
    .sort((left, right) => {
      if (sortMode === 'name') {
        return left.name.localeCompare(right.name, 'ja');
      }
      const leftDate = Number(left.createdAt) || 0;
      const rightDate = Number(right.createdAt) || 0;
      return sortMode === 'created-asc' ? leftDate - rightDate : rightDate - leftDate;
    });

  renderPlaylistCheckboxList(elements.uploadPlaylistSelect, playlists, selectedValues, '対象のプレイリストがありません');
  renderQueuePlaylistOptions();
}

function renderQueuePlaylistOptions() {
  renderQueuePlaylistModalList();
}

function renderQueuePlaylistModalList() {
  if (!elements.queuePlaylistModalList) {
    return;
  }

  if (!state.user) {
    elements.queuePlaylistModalList.innerHTML = '<div class="queue-playlist-modal-empty">ログインすると利用できます</div>';
    return;
  }

  const selectedValues = getSelectedPlaylistIds(elements.queuePlaylistModalList);
  const query = String(elements.queuePlaylistModalSearch?.value || '').trim().toLowerCase();
  const playlists = getOwnedPlaylistsForManagement()
    .filter((playlist) => !query || playlist.name.toLowerCase().includes(query))
    .sort((left, right) => {
      const leftDate = Number(left.createdAt) || 0;
      const rightDate = Number(right.createdAt) || 0;
      return rightDate - leftDate;
    });

  if (!playlists.length) {
    elements.queuePlaylistModalList.innerHTML = '<div class="queue-playlist-modal-empty">プレイリストがありません</div>';
    return;
  }

  elements.queuePlaylistModalList.innerHTML = playlists.map((playlist) => `
    <label class="queue-playlist-modal-item">
      <input type="checkbox" value="${playlist.id}" ${selectedValues.includes(playlist.id) ? 'checked' : ''} />
      <span class="queue-playlist-modal-icon" aria-hidden="true">${playlist.icon || '♫'}</span>
      <span class="queue-playlist-modal-copy">
        <strong>${playlist.name}</strong>
        <small>${playlist.items?.length || 0}曲</small>
      </span>
    </label>
  `).join('');
}

function openQueuePlaylistModal() {
  if (!state.user || !elements.queuePlaylistModal) {
    showAppToast('ログインするとプレイリストへ追加できます', 'error');
    return;
  }

  if (elements.queuePlaylistModalSearch) {
    elements.queuePlaylistModalSearch.value = '';
  }
  renderQueuePlaylistModalList();
  elements.queuePlaylistModal.classList.remove('hidden');
  elements.queuePlaylistModal.setAttribute('aria-hidden', 'false');
}

function closeQueuePlaylistModal() {
  if (!elements.queuePlaylistModal) {
    return;
  }

  elements.queuePlaylistModal.classList.add('hidden');
  elements.queuePlaylistModal.setAttribute('aria-hidden', 'true');
}

async function addQueueTracksToPlaylist(mode) {
  if (!state.user) {
    showAppToast('ログインするとプレイリストへ追加できます', 'error');
    return;
  }

  const selectedPlaylistIds = getSelectedPlaylistIds(elements.queuePlaylistModalList);

  if (!selectedPlaylistIds.length) {
    showAppToast('追加先のプレイリストを選択してください', 'error');
    return;
  }

  const validPlaylists = selectedPlaylistIds
    .map((playlistId) => state.playlists.find((item) => item.id === playlistId))
    .filter((playlist) => playlist && playlist.ownerId === state.user.id);

  if (validPlaylists.length !== selectedPlaylistIds.length) {
    showAppToast('追加できるのは自分が作成したプレイリストのみです', 'error');
    return;
  }

  const currentTrack = state.queue[state.currentTrackIndex];
  const tracks = mode === 'current' ? (currentTrack ? [currentTrack] : []) : state.queue.slice();
  if (!tracks.length) {
    showAppToast('追加できる曲がキューにありません', 'error');
    return;
  }

  const favoriteSelected = selectedPlaylistIds.includes('favorite-songs');
  if (favoriteSelected) {
    const added = [];
    for (const track of tracks) {
      if (!state.trackFavorites.includes(track.id)) {
        await toggleTrackFavorite(track);
        added.push(track.id);
      }
    }

    if (!added.length) {
      showAppToast('選択した曲はすでにお気に入り曲にあります', 'info');
    }

    renderMyPlaylists();
    renderFavoriteSongs();
    renderUploadPlaylistOptions();
    if (elements.queuePlaylistModalList) {
      setSelectedPlaylistIds(elements.queuePlaylistModalList, []);
    }
    if (elements.queueModalAddMode) elements.queueModalAddMode.value = 'current';
    renderQueuePlaylistOptions();
    closeQueuePlaylistModal();
    return;
  }

  const playlistSummary = validPlaylists.map((playlist) => ({
    playlist,
    existingKeys: new Set((playlist.items || []).map((track) => `${track.id || ''}|${track.src || ''}`)),
  }));
  const tracksToAdd = tracks.filter((track) => {
    const key = `${track.id || ''}|${track.src || ''}`;
    return playlistSummary.every((entry) => !entry.existingKeys.has(key));
  });

  if (!tracksToAdd.length) {
    showAppToast('選択した曲はすでにプレイリストにあります', 'info');
    return;
  }

  for (const playlistEntry of playlistSummary) {
    for (const track of tracksToAdd) {
      if (!playlistEntry.existingKeys.has(`${track.id || ''}|${track.src || ''}`)) {
        await addUploadedTrackToPlaylist(track, playlistEntry.playlist.id);
      }
    }
  }

  renderMyPlaylists();
  renderFavoritePlaylists();
  renderUploadPlaylistOptions();
  if (elements.queuePlaylistModalList) {
    setSelectedPlaylistIds(elements.queuePlaylistModalList, []);
  }
  if (elements.queueModalAddMode) elements.queueModalAddMode.value = 'current';
  renderQueuePlaylistOptions();
  closeQueuePlaylistModal();
  showAppToast(`${tracksToAdd.length}曲を${validPlaylists.length}件のプレイリストに追加しました`, 'success');
}

function addUploadPlaylist() {
  if (!state.user) {
    return;
  }

  openPlaylistManagerModal();
}

function renderPlaylistManagerList() {
  if (!elements.playlistManagerList) {
    return;
  }

  const query = String(elements.playlistManagerSearch?.value || '').trim().toLowerCase();
  const playlists = getOwnedPlaylistsForManagement()
    .filter((playlist) => !query || playlist.name.toLowerCase().includes(query))
    .sort((left, right) => {
      const sortMode = elements.playlistManagerSort?.value || 'created-desc';
      if (sortMode === 'created-desc' || sortMode === 'created-asc') {
        const leftDate = Number(left.createdAt) || 0;
        const rightDate = Number(right.createdAt) || 0;
        return sortMode === 'created-desc' ? rightDate - leftDate : leftDate - rightDate;
      }
      return left.name.localeCompare(right.name, 'ja');
    });

  if (!playlists.length) {
    elements.playlistManagerList.innerHTML = '<div class="playlist-manager-empty">プレイリストがありません</div>';
    return;
  }

  elements.playlistManagerList.innerHTML = playlists.map((playlist) => `
    <div class="playlist-manager-item" data-playlist-id="${playlist.id}">
      <span class="playlist-manager-icon" aria-hidden="true">${playlist.icon || '♫'}</span>
      <div class="playlist-manager-copy">
        <strong>${playlist.name}</strong>
        <small>${playlist.items?.length || 0}曲 · 作成日時 ${formatDateTimeLabel(playlist.createdAt) || '-'}</small>
      </div>
      <div class="playlist-manager-actions">
        <button class="row-action" type="button" data-playlist-action="rename">変更</button>
        <button class="row-action danger-action" type="button" data-playlist-action="delete">削除</button>
      </div>
    </div>
  `).join('');

  elements.playlistManagerList.querySelectorAll('[data-playlist-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('[data-playlist-id]');
      const playlistId = item?.dataset.playlistId;
      if (button.dataset.playlistAction === 'rename') {
        openPlaylistRenameModal(playlistId);
      } else {
        openPlaylistDeleteModal(playlistId);
      }
    });
  });
}

function openPlaylistManagerModal() {
  if (!state.user || !elements.playlistManagerModal) {
    return;
  }

  renderPlaylistManagerList();
  elements.playlistManagerModal.classList.remove('hidden');
  elements.playlistManagerModal.setAttribute('aria-hidden', 'false');
}

function closePlaylistManagerModal() {
  if (!elements.playlistManagerModal) {
    return;
  }

  elements.playlistManagerModal.classList.add('hidden');
  elements.playlistManagerModal.setAttribute('aria-hidden', 'true');
}

function closePlaylistManagerAndReturn() {
  const returnToQueuePlaylistModal = state.returnToQueuePlaylistModal;
  state.returnToQueuePlaylistModal = false;
  closePlaylistManagerModal();
  if (returnToQueuePlaylistModal) {
    openQueuePlaylistModal();
  }
}

function openPlaylistRenameModal(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist || !elements.playlistRenameModal || !elements.playlistRenameInput) {
    return;
  }

  state.renamingPlaylistId = playlistId;
  state.playlistEditDraft = {
    name: playlist.name,
    icon: playlist.icon || '♫',
    items: Array.isArray(playlist.items) ? playlist.items.map((item) => ({ ...item })) : [],
  };
  elements.playlistRenameInput.value = playlist.name;
  if (elements.playlistRenameIconSelect) {
    elements.playlistRenameIconSelect.innerHTML = PLAYLIST_ICONS
      .map((icon) => `<option value="${icon}">${icon}</option>`)
      .join('');
    elements.playlistRenameIconSelect.value = playlist.icon || '♫';
  }
  const iconPreview = elements.playlistRenameModal.querySelector('.playlist-rename-icon');
  if (iconPreview) {
    iconPreview.textContent = elements.playlistRenameIconSelect?.value || playlist.icon || '♫';
  }
  renderPlaylistEditTracks();
  elements.playlistRenameModal.classList.remove('hidden');
  elements.playlistRenameModal.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => elements.playlistRenameInput.focus(), 0);
}

function closePlaylistRenameModal() {
  if (!elements.playlistRenameModal) {
    return;
  }

  elements.playlistRenameModal.classList.add('hidden');
  elements.playlistRenameModal.setAttribute('aria-hidden', 'true');
  state.renamingPlaylistId = null;
  state.playlistEditDraft = null;
}

function renderTrackEditPlaylistOptions() {
  if (!elements.trackEditPlaylistSelect) {
    return;
  }

  const selectedValues = getSelectedPlaylistIds(elements.trackEditPlaylistSelect);
  const sortMode = elements.trackEditPlaylistSort?.value || 'created-desc';
  const query = String(elements.trackEditPlaylistSearch?.value || '').trim().toLowerCase();
  const playlists = getOwnedPlaylistsForManagement()
    .filter((playlist) => !query || playlist.name.toLowerCase().includes(query))
    .sort((left, right) => {
      if (sortMode === 'name') {
        return left.name.localeCompare(right.name, 'ja');
      }
      const leftDate = Number(left.createdAt) || 0;
      const rightDate = Number(right.createdAt) || 0;
      return sortMode === 'created-asc' ? leftDate - rightDate : rightDate - leftDate;
    });

  renderPlaylistCheckboxList(elements.trackEditPlaylistSelect, playlists, selectedValues, '対象のプレイリストがありません');
}

async function syncTrackAssignmentToPlaylists(track, previousPlaylistIds, nextPlaylistIds) {
  if (!track || !state.user?.id) {
    return;
  }

  const previousSet = new Set((previousPlaylistIds || []).filter(Boolean).map(String));
  const nextSet = new Set((nextPlaylistIds || []).filter(Boolean).map(String));
  const normalizedTrackId = String(track.id || '');
  const normalizedSrc = String(track.src || '');

  const previousPlaylists = state.playlists.filter((playlist) => previousSet.has(String(playlist.id)));
  previousPlaylists.forEach((playlist) => {
    if (!nextSet.has(String(playlist.id))) {
      playlist.items = Array.isArray(playlist.items) ? playlist.items.filter((item) => {
        const itemId = String(item.id || '');
        const itemSrc = String(item.src || '');
        return itemId !== normalizedTrackId && itemSrc !== normalizedSrc;
      }) : [];
    }
  });

  const nextPlaylists = state.playlists.filter((playlist) => nextSet.has(String(playlist.id)));
  nextPlaylists.forEach((playlist) => {
    playlist.items = Array.isArray(playlist.items) ? playlist.items : [];
    const alreadyExists = playlist.items.some((item) => {
      const itemId = String(item.id || '');
      const itemSrc = String(item.src || '');
      return itemId === normalizedTrackId || itemSrc === normalizedSrc;
    });

    if (!alreadyExists) {
      playlist.items.unshift({
        id: track.id,
        title: track.title || 'Untitled track',
        artist: track.artist || '匿名アカウント',
        genre: track.genre || 'Uploaded',
        src: track.src,
        description: track.description || '',
      });
    }
  });

  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  const previousArray = Array.from(previousSet);
  const nextArray = Array.from(nextSet);

  if (previousArray.length) {
    for (const playlistId of previousArray) {
      if (!nextSet.has(playlistId)) {
        await client
          .from('playlist_items')
          .delete()
          .eq('playlist_id', playlistId)
          .eq('src', track.src);
      }
    }
  }

  if (nextArray.length) {
    for (const playlistId of nextArray) {
      const { data: matchingItem, error: matchingError } = await client
        .from('playlist_items')
        .select('id')
        .eq('playlist_id', playlistId)
        .eq('src', track.src)
        .maybeSingle();

      if (!matchingError && !matchingItem) {
        const playlist = state.playlists.find((item) => item.id === playlistId);
        await client.from('playlist_items').insert({
          playlist_id: playlistId,
          title: track.title || 'Untitled track',
          artist: track.artist || '匿名アカウント',
          genre: track.genre || 'Uploaded',
          src: track.src,
          order_index: Array.isArray(playlist?.items) ? playlist.items.length : 0,
        });
      }
    }
  }

  const legacyPrimaryPlaylistId = nextArray[0] || null;
  await client
    .from('video_uploads')
    .update({ playlist_id: legacyPrimaryPlaylistId })
    .eq('id', track.id)
    .eq('owner_id', state.user.id);
}

function openTrackEditModal(track) {
  if (!track || !elements.trackEditModal) {
    return;
  }

  state.editingTrackId = track.id;
  if (elements.trackEditTitleInput) {
    elements.trackEditTitleInput.value = track.title || '';
  }
  if (elements.trackEditDescriptionInput) {
    elements.trackEditDescriptionInput.value = track.description || '';
  }

  if (elements.trackEditPlaylistSelect) {
    const playlistIds = Array.isArray(track.playlistIds) && track.playlistIds.length
      ? track.playlistIds
      : (track.playlistId ? [track.playlistId] : []);
    setSelectedPlaylistIds(elements.trackEditPlaylistSelect, playlistIds);
    renderTrackEditPlaylistOptions();
    setSelectedPlaylistIds(elements.trackEditPlaylistSelect, playlistIds);
  }

  elements.trackEditModal.classList.remove('hidden');
  elements.trackEditModal.setAttribute('aria-hidden', 'false');
}

function closeTrackEditModal() {
  if (!elements.trackEditModal) {
    return;
  }

  elements.trackEditModal.classList.add('hidden');
  elements.trackEditModal.setAttribute('aria-hidden', 'true');
  state.editingTrackId = null;
}

function renderPlaylistEditTracks() {
  if (!elements.playlistEditTracks || !state.playlistEditDraft) {
    return;
  }

  const tracks = state.playlistEditDraft.items;
  if (!tracks.length) {
    elements.playlistEditTracks.innerHTML = '<div class="playlist-edit-empty">曲がありません。</div>';
    return;
  }

  elements.playlistEditTracks.innerHTML = tracks.map((track, index) => `
    <div class="playlist-edit-track">
      <span class="playlist-edit-track-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="playlist-edit-track-title">${track.title || 'Untitled track'}</span>
      <button type="button" class="playlist-track-action" data-track-action="up" data-track-index="${index}" aria-label="上へ" ${index === 0 ? 'disabled' : ''}>↑</button>
      <button type="button" class="playlist-track-action" data-track-action="down" data-track-index="${index}" aria-label="下へ" ${index === tracks.length - 1 ? 'disabled' : ''}>↓</button>
      <button type="button" class="playlist-track-action playlist-track-delete" data-track-action="delete" data-track-index="${index}" aria-label="曲を削除">×</button>
    </div>
  `).join('');

  elements.playlistEditTracks.querySelectorAll('[data-track-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.trackIndex);
      const action = button.dataset.trackAction;
      if (action === 'delete') {
        state.playlistEditDraft.items.splice(index, 1);
      } else {
        const nextIndex = action === 'up' ? index - 1 : index + 1;
        [state.playlistEditDraft.items[index], state.playlistEditDraft.items[nextIndex]] = [state.playlistEditDraft.items[nextIndex], state.playlistEditDraft.items[index]];
      }
      renderPlaylistEditTracks();
    });
  });
}

function openPlaylistDeleteModal(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist || !elements.playlistDeleteModal) {
    return;
  }

  state.deletingPlaylistId = playlistId;
  setText(elements.playlistDeleteName, playlist.name);
  elements.playlistDeleteModal.classList.remove('hidden');
  elements.playlistDeleteModal.setAttribute('aria-hidden', 'false');
}

function closePlaylistDeleteModal() {
  if (!elements.playlistDeleteModal) {
    return;
  }

  elements.playlistDeleteModal.classList.add('hidden');
  elements.playlistDeleteModal.setAttribute('aria-hidden', 'true');
  state.deletingPlaylistId = null;
}

function openFavoriteClearModal() {
  if (!elements.favoriteClearModal) {
    return;
  }

  setText(elements.favoriteClearTitle, 'お気に入り曲をすべて解除');
  setText(elements.favoriteClearMessage, `お気に入り曲 ${state.trackFavorites.length}件をすべて解除しますか？ 解除後はホームや再生リストの一覧から外れます。`);
  elements.favoriteClearModal.classList.remove('hidden');
  elements.favoriteClearModal.setAttribute('aria-hidden', 'false');
}

function closeFavoriteClearModal() {
  if (!elements.favoriteClearModal) {
    return;
  }

  elements.favoriteClearModal.classList.add('hidden');
  elements.favoriteClearModal.setAttribute('aria-hidden', 'true');
}

function openPlaylistVisibilityModal(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist || !elements.playlistVisibilityModal) {
    return;
  }

  const nextIsPublic = !playlist.isPublic;
  state.visibilityConfirmPlaylistId = playlistId;
  state.visibilityConfirmNextIsPublic = nextIsPublic;

  setText(elements.playlistVisibilityName, playlist.name);
  setText(elements.playlistVisibilityMessage, nextIsPublic
    ? '公開後はホーム画面、検索、あなたのプロフィール画面で表示され、他の人がこのプレイリストを閲覧できるようになります。'
    : 'このプレイリストを非公開にして、ホーム画面や検索、プロフィールから隠します。');
  setText(elements.confirmPlaylistVisibilityBtn, nextIsPublic ? '公開する' : '非公開にする');

  elements.playlistVisibilityModal.classList.remove('hidden');
  elements.playlistVisibilityModal.setAttribute('aria-hidden', 'false');
}

function closePlaylistVisibilityModal() {
  if (!elements.playlistVisibilityModal) {
    return;
  }

  elements.playlistVisibilityModal.classList.add('hidden');
  elements.playlistVisibilityModal.setAttribute('aria-hidden', 'true');
  state.visibilityConfirmPlaylistId = null;
  state.visibilityConfirmTrackId = null;
  state.visibilityConfirmNextIsPublic = null;
}

function openTrackVisibilityModal(track) {
  if (!track || !elements.playlistVisibilityModal) {
    return;
  }

  const nextIsPublic = !Boolean(track.isPublic);
  state.visibilityConfirmPlaylistId = null;
  state.visibilityConfirmTrackId = track.id;
  state.visibilityConfirmNextIsPublic = nextIsPublic;

  setText(elements.playlistVisibilityName, track.title || 'この音楽');
  setText(elements.playlistVisibilityMessage, nextIsPublic
    ? '公開後はホーム画面、検索、あなたのプロフィール画面で表示され、他の人がこの音楽を聴けるようになります。'
    : 'この音楽を非公開にして、ホーム画面や検索、プロフィールから隠します。');
  setText(elements.confirmPlaylistVisibilityBtn, nextIsPublic ? '公開する' : '非公開にする');

  elements.playlistVisibilityModal.classList.remove('hidden');
  elements.playlistVisibilityModal.setAttribute('aria-hidden', 'false');
}

async function createPlaylistFromManager() {
  const name = elements.newPlaylistNameInput?.value.trim();
  if (!name?.trim()) {
    return;
  }

  const client = getSupabaseClient();
  const playlist = {
    id: `playlist-${Date.now()}`,
    name: name.trim(),
    icon: '♫',
    owner: getUserNickname(),
    ownerId: state.user.id,
    ownerName: getUserNickname(),
    ownerIcon: getUserIcon(),
    items: [],
    isPublic: false,
    createdAt: Date.now(),
  };

  if (client && state.user?.id) {
    let { data, error } = await client
      .from('playlists')
      .insert({ owner_id: state.user.id, name: playlist.name, description: '', icon: playlist.icon, is_public: false })
      .select('id, name, description, icon, is_public, created_at')
      .single();

    if (error?.code === '42703') {
      ({ data, error } = await client
        .from('playlists')
        .insert({ owner_id: state.user.id, name: playlist.name, description: '', is_public: false })
        .select('id, name, description, is_public, created_at')
        .single());
    }

    if (error) {
      logAppError('playlist create failed', error);
      window.alert('プレイリストを作成できませんでした。Supabaseの設定と権限を確認してください。');
      return;
    }

    playlist.id = data.id;
    playlist.createdAt = new Date(data.created_at).getTime();
  }

  state.playlists.unshift(playlist);
  state.currentPlaylistId = playlist.id;
  renderMyPlaylists();
  renderFavoritePlaylists();
  renderPlaylistManagerList();
  renderUploadPlaylistOptions();
  renderQueuePlaylistOptions();
  renderTrackEditPlaylistOptions();

  if (elements.newPlaylistNameInput) {
    elements.newPlaylistNameInput.value = '';
  }
  if (elements.uploadPlaylistSelect) {
    addSelectedPlaylistId(elements.uploadPlaylistSelect, playlist.id);
  }
  if (elements.queuePlaylistModalList) {
    addSelectedPlaylistId(elements.queuePlaylistModalList, playlist.id);
  }
  if (elements.trackEditPlaylistSelect) {
    addSelectedPlaylistId(elements.trackEditPlaylistSelect, playlist.id);
  }

  if (state.editingTrackId && elements.trackEditModal) {
    closePlaylistManagerModal();
    const editingTrack = state.libraryTracks.find((item) => String(item.id) === String(state.editingTrackId));
    if (editingTrack) {
      openTrackEditModal(editingTrack);
    }
  } else {
    const returnToQueuePlaylistModal = state.returnToQueuePlaylistModal;
    state.returnToQueuePlaylistModal = false;
    closePlaylistManagerModal();
    if (returnToQueuePlaylistModal) {
      openQueuePlaylistModal();
    }
  }

  saveLocalState();
}

async function renamePlaylist(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const name = elements.playlistRenameInput?.value.trim();
  const icon = elements.playlistRenameIconSelect?.value || playlist.icon || '♫';
  const items = state.playlistEditDraft?.items || [];
  if (!name) {
    closePlaylistRenameModal();
    return;
  }

  playlist.name = name;
  playlist.icon = icon;
  playlist.items = items.map((item) => ({ ...item }));
  if (state.currentPlaylistId === playlistId) {
    refreshQueueFromCurrentPlaylist();
  }
  const client = getSupabaseClient();
  if (client && state.user?.id && !String(playlistId).startsWith('playlist-')) {
    let { error } = await client.from('playlists').update({ name, icon }).eq('id', playlistId).eq('owner_id', state.user.id);
    if (error?.code === '42703') {
      ({ error } = await client.from('playlists').update({ name }).eq('id', playlistId).eq('owner_id', state.user.id));
    }
    if (error) {
      logAppError('playlist rename failed', error);
    }
    const { error: itemsDeleteError } = await client.from('playlist_items').delete().eq('playlist_id', playlistId);
    if (!itemsDeleteError && items.length) {
      const { error: itemsInsertError } = await client.from('playlist_items').insert(items.map((item, index) => ({
        playlist_id: playlistId,
        title: item.title,
        artist: item.artist || 'Family',
        genre: item.genre || 'Music',
        src: item.src,
        order_index: index,
      })));
      if (itemsInsertError) {
        logAppError('playlist item update failed', itemsInsertError);
      }
    }
  }

  renderPlaylistManagerList();
  renderMyPlaylists();
  renderUploadPlaylistOptions();
  saveLocalState();
  closePlaylistRenameModal();
}

async function deletePlaylist(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const previousPlaylistName = playlist.name;
  state.playlists = state.playlists.filter((item) => item.id !== playlistId);
  if (state.currentPlaylistId === playlistId) {
    state.currentPlaylistId = state.playlists[0]?.id || null;
    refreshQueueFromCurrentPlaylist();
  }

  const client = getSupabaseClient();
  if (client && state.user?.id && !String(playlistId).startsWith('playlist-')) {
    const { error } = await client.from('playlists').delete().eq('id', playlistId).eq('owner_id', state.user.id);
    if (error) {
      logAppError('playlist delete failed', error);
      showAppToast('プレイリストの削除に失敗しました', 'error');
      return;
    }
  }

  renderPlaylistManagerList();
  renderMyPlaylists();
  renderUploadPlaylistOptions();
  if (elements.uploadPlaylistSearch) {
    elements.uploadPlaylistSearch.value = '';
  }
  saveLocalState();
  closePlaylistDeleteModal();
  showAppToast(`「${previousPlaylistName}」を削除しました`, 'success');
}

function refreshQueueFromCurrentPlaylist() {
  if (state.currentPlaylistId === 'favorite-songs') {
    state.queue = getFavoriteSongTracks().map((track) => ({ ...track }));
    renderQueue();
    return;
  }

  if (!state.playlists.length) {
    state.queue = [];
    renderQueue();
    return;
  }

  const playlist = state.playlists.find((item) => item.id === state.currentPlaylistId) || state.playlists[0];
  state.queue = (playlist?.items || []).map((track) => ({ ...track }));
  renderQueue();
}

function addPlaylistToQueue(playlistId) {
  const playlist = playlistId === 'favorite-songs' ? getFavoriteSongsPlaylist() : state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const seen = new Set();
  const playlistTracks = (Array.isArray(playlist.items) ? playlist.items : [])
    .map((track) => {
      const normalized = normalizeTrackSnapshot(track);
      if (!normalized || !normalized.src) {
        return null;
      }

      const libraryTrack = state.libraryTracks.find((item) => item.src === normalized.src || item.publicId === normalized.publicId || item.id === normalized.id);
      if (libraryTrack) {
        return normalizeTrackSnapshot({ ...normalized, ...libraryTrack, id: libraryTrack.id || normalized.id });
      }

      return normalized;
    })
    .filter((track) => {
      if (!track || !track.src) {
        return false;
      }

      const key = `${track.id || ''}|${track.src || ''}|${track.publicId || ''}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });

  state.currentPlaylistId = playlist.id;
  state.queue = playlistTracks;
  state.currentTrackIndex = 0;
  renderQueue();

  if (state.queue.length) {
    loadTrack(0, true);
  }
}

function addTrackToQueueAndPlay(track) {
  if (!track) {
    return;
  }

  const trackKey = `${track.id || ''}|${track.src || ''}`;
  let trackIndex = state.queue.findIndex((item) => `${item.id || ''}|${item.src || ''}` === trackKey);

  if (trackIndex < 0) {
    state.queue = [...state.queue, { ...track }];
    trackIndex = state.queue.length - 1;
  }

  state.currentTrackIndex = trackIndex;
  loadTrack(trackIndex, true);
}

function updateModeButtons() {
  if (!elements.modeButtons.length) {
    return;
  }

  elements.modeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === state.repeatMode);
  });

  setText(elements.playerModeBadge, MODE_LABELS[state.repeatMode] || 'キュー連続再生');
  if (elements.playerModeBadgeRight) {
    setText(elements.playerModeBadgeRight, MODE_LABELS[state.repeatMode] || 'キュー連続再生');
  }
}

function setMode(mode) {
  const allowed = ['queue', 'shuffle', 'repeat-one'];
  if (!allowed.includes(mode)) {
    return;
  }

  state.repeatMode = mode;
  if (mode === 'shuffle' && state.queue.length > 1) {
    const currentTrack = state.queue[state.currentTrackIndex];
    const remainingTracks = state.queue.filter((_, index) => index !== state.currentTrackIndex);
    for (let index = remainingTracks.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [remainingTracks[index], remainingTracks[randomIndex]] = [remainingTracks[randomIndex], remainingTracks[index]];
    }
    state.queue = currentTrack ? [currentTrack, ...remainingTracks] : remainingTracks;
    state.currentTrackIndex = 0;
    renderQueue();
    showAppToast('キューをシャッフルしました', 'success');
  }
  updateModeButtons();
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

function getVideoDuration(video, fallbackDuration = 0) {
  if (!video) {
    return 0;
  }

  if (Number.isFinite(video.duration) && video.duration > 0) {
    return video.duration;
  }

  if (video.seekable?.length) {
    const seekableEnd = video.seekable.end(video.seekable.length - 1);
    if (Number.isFinite(seekableEnd) && seekableEnd > 0) {
      return seekableEnd;
    }
  }

  return Number.isFinite(fallbackDuration) && fallbackDuration > 0 ? fallbackDuration : 0;
}

function updateProgress() {
  if (!elements.videoPlayer) {
    return;
  }

  const currentTime = Number.isFinite(elements.videoPlayer.currentTime) ? elements.videoPlayer.currentTime : 0;
  const track = state.queue[state.currentTrackIndex] || state.lastPlayedTrack;
  const duration = getVideoDuration(elements.videoPlayer, Number(track?.duration) || 0);

  setText(elements.currentTime, formatTime(currentTime));
  setText(elements.totalTime, formatTime(duration));
  if (elements.progressFill) {
    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
    elements.progressFill.style.width = `${progressPercent}%`;
  }
  if (elements.progressBar) {
    elements.progressBar.setAttribute('aria-valuemax', String(Math.floor(duration)));
    elements.progressBar.setAttribute('aria-valuenow', String(Math.floor(currentTime)));
  }

  updatePlayerIdleState();
}

function seekToProgressPosition(clientX) {
  if (!elements.videoPlayer || !elements.progressBar) {
    return;
  }

  const track = state.queue[state.currentTrackIndex] || state.lastPlayedTrack;
  const duration = getVideoDuration(elements.videoPlayer, Number(track?.duration) || 0);
  if (!duration) {
    return;
  }

  const bounds = elements.progressBar.getBoundingClientRect();
  if (!bounds.width) {
    return;
  }
  const ratio = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
  elements.videoPlayer.currentTime = duration * ratio;
  updateProgress();
}

function autoplayAfterProgressChange() {
  if (elements.videoPlayer?.paused) {
    elements.videoPlayer.play().catch(() => {});
  }
}

function updateCustomPlayerViewport(track) {
  const viewport = elements.playerViewport;
  if (!viewport) {
    return;
  }

  const activeTrack = track || state.queue[state.currentTrackIndex] || null;
  const thumbnail = activeTrack?.thumbnail || activeTrack?.thumbnail_url || '';
  const hasTrack = Boolean(activeTrack);
  const hasTrackLoaded = Boolean(elements.videoPlayer && elements.videoPlayer.currentSrc);

  viewport.style.backgroundImage = hasTrack && thumbnail ? `url("${thumbnail}")` : '';
  viewport.classList.toggle('has-thumbnail', Boolean(hasTrack && thumbnail));
  viewport.classList.toggle('is-playing', Boolean(hasTrackLoaded && elements.videoPlayer && !elements.videoPlayer.paused));
  setText(elements.playerViewportTitle, hasTrack ? activeTrack.title : '曲を選択');
  const viewportDate = hasTrack ? formatDateLabel(activeTrack.createdAt || activeTrack.created_at) : '';
  setText(elements.playerViewportArtist, hasTrack ? `${viewportDate || '-'} ${activeTrack.artistIcon || '🎧'} ${activeTrack.artist || '匿名アカウント'}` : '再生中の情報がここに表示されます');
}

function toggleFallbackPlayerExpanded() {
  const viewport = elements.playerViewport;
  if (!viewport) {
    return;
  }

  const expanded = viewport.classList.toggle('is-expanded');
  elements.expandPlayerBtn?.setAttribute('aria-label', expanded ? '再生画面を縮小' : '再生画面を拡大');

  if (expanded) {
    const resetPageScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetPageScroll();
    window.requestAnimationFrame(resetPageScroll);
  }

  showPlayerControls();
}

async function togglePlayerExpanded() {
  const viewport = elements.playerViewport;
  if (!viewport) {
    return;
  }

  if (window.matchMedia?.('(max-width: 900px)').matches) {
    toggleFallbackPlayerExpanded();
    return;
  }

  try {
    if (document.fullscreenElement === viewport) {
      await document.exitFullscreen();
    } else if (typeof viewport.requestFullscreen === 'function') {
      await viewport.requestFullscreen();
    } else {
      toggleFallbackPlayerExpanded();
    }
  } catch (error) {
    console.warn('Player fullscreen is unavailable:', error);
    toggleFallbackPlayerExpanded();
  }
}

function showPlayerControls() {
  const viewport = elements.playerViewport;
  if (!viewport) {
    return;
  }

  viewport.classList.add('controls-visible');
  if (state.playerControlsTimer) {
    window.clearTimeout(state.playerControlsTimer);
  }

  state.playerControlsTimer = window.setTimeout(() => {
    hidePlayerControls();
  }, 2500);
}

function hidePlayerControls() {
  elements.playerViewport?.classList.remove('controls-visible');
  if (state.playerControlsTimer) {
    window.clearTimeout(state.playerControlsTimer);
    state.playerControlsTimer = null;
  }
}

function closePlayerControls() {
  if (elements.playerViewport?.classList.contains('is-expanded')) {
    elements.playerViewport.classList.remove('is-expanded');
    elements.expandPlayerBtn?.setAttribute('aria-label', '再生画面を拡大');
  }

  if (document.fullscreenElement === elements.playerViewport) {
    document.exitFullscreen().catch(() => {});
    return;
  }

  hidePlayerControls();
}

function updatePlayButton() {
  if (!elements.videoPlayer || !elements.playPauseBtn) {
    return;
  }

  const isPaused = elements.videoPlayer.paused;
  elements.playPauseBtn.textContent = isPaused ? '▶' : '⏸';
  elements.playPauseBtn.setAttribute('aria-label', isPaused ? '再生' : '一時停止');
  updatePlayerMeta();
}

function getNextIndex() {
  if (!state.queue.length) {
    return 0;
  }

  if (state.repeatMode === 'repeat-one') {
    return state.currentTrackIndex;
  }

  if (state.repeatMode === 'shuffle') {
    let nextIndex = Math.floor(Math.random() * state.queue.length);
    while (nextIndex === state.currentTrackIndex && state.queue.length > 1) {
      nextIndex = Math.floor(Math.random() * state.queue.length);
    }
    return nextIndex;
  }

  return state.currentTrackIndex < state.queue.length - 1 ? state.currentTrackIndex + 1 : 0;
}

function getPreviousIndex() {
  if (!state.queue.length) {
    return 0;
  }

  if (state.repeatMode === 'shuffle') {
    let previousIndex = Math.floor(Math.random() * state.queue.length);
    while (previousIndex === state.currentTrackIndex && state.queue.length > 1) {
      previousIndex = Math.floor(Math.random() * state.queue.length);
    }
    return previousIndex;
  }

  return state.currentTrackIndex > 0 ? state.currentTrackIndex - 1 : state.queue.length - 1;
}

function loadTrack(index, autoplay = true) {
  if (!state.queue.length || !elements.videoPlayer) {
    return;
  }

  state.currentTrackIndex = ((index % state.queue.length) + state.queue.length) % state.queue.length;
  const track = state.queue[state.currentTrackIndex];
  if (!track) {
    return;
  }

  const libraryTrack = state.libraryTracks.find((item) => (
    item.id === track.id || item.src === track.src || item.publicId === track.publicId
  ));
  if (libraryTrack && libraryTrack.artist && libraryTrack.artist !== '匿名アカウント') {
    track.artist = libraryTrack.artist;
    track.artistIcon = libraryTrack.artistIcon || track.artistIcon;
    track.ownerId = libraryTrack.ownerId || track.ownerId;
  }

  if (autoplay) {
    track.playCount = (Number(track.playCount) || 0) + 1;
    if (libraryTrack && libraryTrack !== track) {
      libraryTrack.playCount = (Number(libraryTrack.playCount) || 0) + 1;
    }
    recordTrackPlay(track).catch((error) => {
      logAppError('track play record threw', error);
    });
  }

  elements.videoPlayer.src = track.src;
  elements.videoPlayer.load();

  if (elements.featuredTitle) {
    elements.featuredTitle.textContent = track.title;
  }
  if (elements.featuredSubtitle) {
    elements.featuredSubtitle.textContent = `${track.artistIcon || '🎧'} 投稿者: ${track.artist || '匿名アカウント'}`;
  }
  if (elements.featuredTitleRight) {
    elements.featuredTitleRight.textContent = track.title;
  }
  if (elements.featuredSubtitleRight) {
    elements.featuredSubtitleRight.textContent = `${track.artistIcon || '🎧'} 投稿者: ${track.artist || '匿名アカウント'}`;
  }
  if (elements.featuredMode) {
    elements.featuredMode.textContent = 'みんなのおすすめ';
  }
  if (elements.featuredModeRight) {
    elements.featuredModeRight.textContent = 'みんなのおすすめ';
  }

  updatePlayerMeta(track);
  updateCustomPlayerViewport(track);
  updateMediaSession(track);

  if (track.ownerId && track.artist === '匿名アカウント') {
    hydrateTrackAuthor(track).then((updated) => {
      if (updated && state.queue[state.currentTrackIndex] === track) {
        updatePlayerMeta(track);
        updateCustomPlayerViewport(track);
      }
    }).catch((error) => {
      logAppError('player author load failed', error);
    });
  }

  if (autoplay) {
    elements.videoPlayer.play().catch(() => {});
  }

  renderRecentMusic();
  renderQueue();
  renderFavoritePlaylists();
  syncEmptyCloudState();
  updateProgress();
  saveLastPlayedTrackToSupabase(track);
}

function seekBySeconds(deltaSeconds) {
  if (!elements.videoPlayer) {
    return;
  }

  const track = state.queue[state.currentTrackIndex] || state.lastPlayedTrack;
  const duration = getVideoDuration(elements.videoPlayer, Number(track?.duration) || 0);
  const nextTime = Math.max(0, Math.min(duration, elements.videoPlayer.currentTime + deltaSeconds));
  elements.videoPlayer.currentTime = nextTime;
  updateProgress();
}

function togglePlayback() {
  if (!state.queue.length || !elements.videoPlayer) {
    return;
  }

  if (elements.videoPlayer.paused) {
    elements.videoPlayer.play().catch(() => {});
  } else {
    elements.videoPlayer.pause();
  }
}

function updateMediaSession(track = state.queue[state.currentTrackIndex]) {
  if (!('mediaSession' in navigator) || !track) {
    return;
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title || 'Music Share',
    artist: track.artist || '匿名アカウント',
    album: 'Music Share',
  });
}

function setupMediaSession() {
  if (!('mediaSession' in navigator)) {
    return;
  }

  const actions = {
    play: () => elements.videoPlayer?.play().catch(() => {}),
    pause: () => elements.videoPlayer?.pause(),
    seekbackward: () => seekBySeconds(-10),
    seekforward: () => seekBySeconds(10),
    previoustrack: () => loadTrack(getPreviousIndex(), true),
    nexttrack: () => loadTrack(getNextIndex(), true),
  };

  Object.entries(actions).forEach(([action, handler]) => {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch {
      // Safari may reject unsupported Media Session actions.
    }
  });
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
    ownerId: state.user.id,
    ownerName: getUserNickname(),
    ownerIcon: getUserIcon(),
    items: [],
    isPublic: false,
    createdAt: Date.now(),
  };

  state.playlists.unshift(playlist);
  state.currentPlaylistId = playlist.id;
  saveLocalState();
  renderMyPlaylists();
  renderUploadPlaylistOptions();
  renderFavoritePlaylists();
  refreshQueueFromCurrentPlaylist();
  loadTrack(0, false);
}

async function toggleFavorite(playlistId) {
  const isFavorite = state.favorites.includes(playlistId);
  const playlist = state.playlists.find((item) => item.id === playlistId);

  if (!state.favorites.includes(playlistId)) {
    state.favorites.push(playlistId);
    if (playlist) {
      playlist.favoriteCount = Math.max(0, (Number(playlist.favoriteCount) || 0) + 1);
    }
  } else {
    state.favorites = state.favorites.filter((id) => id !== playlistId);
    if (playlist) {
      playlist.favoriteCount = Math.max(0, (Number(playlist.favoriteCount) || 0) - 1);
    }
  }

  const client = getSupabaseClient();
  if (client && state.user?.id && !String(playlistId).startsWith('playlist-')) {
    if (isFavorite) {
      const { error } = await client
        .from('favorite_playlists')
        .delete()
        .eq('user_id', state.user.id)
        .eq('playlist_id', playlistId);
      if (error) {
        logAppError('favorite playlist remove failed', error);
        showAppToast('プレイリストのお気に入り解除に失敗しました', 'error');
        return;
      }
    } else {
      const { error } = await client
        .from('favorite_playlists')
        .upsert({ user_id: state.user.id, playlist_id: playlistId }, { onConflict: 'user_id,playlist_id' });
      if (error) {
        logAppError('favorite playlist save failed', error);
        showAppToast('プレイリストのお気に入り追加に失敗しました', 'error');
        return;
      }
    }
  }

  if (Array.isArray(state.playlists)) {
    await refreshPlaylistFavoriteCountsFromSupabase(state.playlists);
  }

  saveLocalState();
  renderFavoritePlaylists();
  renderMyPlaylists();
  renderRecentPlaylists();
  renderUploadPlaylistOptions();
  showAppToast(isFavorite ? 'プレイリストをお気に入りから外しました' : 'プレイリストをお気に入りに追加しました', 'success');
}

async function clearAllFavoriteSongs(options = {}) {
  if (!state.user?.id || !state.trackFavorites.length) {
    showAppToast('解除できるお気に入り曲がありません', 'info');
    return;
  }

  if (!options.skipConfirm) {
    openFavoriteClearModal();
    return;
  }

  const trackIds = [...state.trackFavorites];
  const previousState = [...state.trackFavorites];
  state.trackFavorites = [];

  for (const track of state.libraryTracks) {
    if (trackIds.includes(track.id)) {
      track.favoriteCount = Math.max(0, (Number(track.favoriteCount) || 0) - 1);
    }
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('track_favorites').delete().eq('user_id', state.user.id);
      if (error) {
        throw error;
      }
    } catch (error) {
      state.trackFavorites = previousState;
      logAppError('clear all favorite songs failed', error);
      showAppToast('お気に入り曲の解除に失敗しました', 'error');
      renderFavoriteSongs();
      renderMyPlaylists();
      updatePlayerMeta(state.queue[state.currentTrackIndex] || null);
      return;
    }
  }

  renderFavoriteSongs();
  renderMyPlaylists();
  renderFavoriteMusic();
  renderRecentMusic();
  updatePlayerMeta(state.queue[state.currentTrackIndex] || null);
  showAppToast('お気に入り曲をすべて解除しました', 'success');
}

async function toggleTrackFavorite(track) {
  if (!track) {
    return;
  }
  if (!state.user?.id) {
    showAppToast('ログインするとお気に入りに追加できます', 'error');
    return;
  }

  const trackId = track.id;
  const isFavorite = state.trackFavorites.includes(trackId);
  const previousFavoriteCount = Number(track.favoriteCount) || 0;

  if (isFavorite) {
    state.trackFavorites = state.trackFavorites.filter((id) => id !== trackId);
  } else {
    state.trackFavorites.push(trackId);
  }

  track.favoriteCount = Math.max(0, previousFavoriteCount + (isFavorite ? -1 : 1));
  const libraryTrack = state.libraryTracks.find((item) => item.id === track.id || item.src === track.src);
  if (libraryTrack && libraryTrack !== track) {
    libraryTrack.favoriteCount = Math.max(0, (Number(libraryTrack.favoriteCount) || 0) + (isFavorite ? -1 : 1));
  }

  const client = getSupabaseClient();
  if (client && /^[0-9a-f-]{36}$/i.test(String(trackId))) {
    try {
      if (isFavorite) {
        const { error } = await client.from('track_favorites').delete().eq('user_id', state.user.id).eq('track_id', trackId);
        if (error) {
          throw error;
        }
      } else {
        const { error } = await client.from('track_favorites').upsert({ user_id: state.user.id, track_id: trackId }, { onConflict: 'track_id,user_id' });
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      if (isFavorite) {
        state.trackFavorites = [...new Set([...state.trackFavorites, trackId])];
      } else {
        state.trackFavorites = state.trackFavorites.filter((id) => id !== trackId);
      }
      track.favoriteCount = previousFavoriteCount;
      if (libraryTrack && libraryTrack !== track) {
        libraryTrack.favoriteCount = Number(libraryTrack.favoriteCount || 0) + (isFavorite ? 1 : -1);
      }
      logAppError('track favorite save failed', error);
      showAppToast('お気に入りの保存に失敗しました', 'error');
      renderFavoriteMusic();
      renderFavoriteSongs();
      renderMyPlaylists();
      updatePlayerMeta(track);
      return;
    }
  }

  updatePlayerMeta(track);
  renderMyMusicMenu();
  renderFavoriteMenu();
  renderFavoriteMusic();
  renderRecentMusic();
  renderMyPlaylists();
  showAppToast(isFavorite ? 'お気に入りから解除しました' : 'お気に入りに追加しました', 'success');
}

async function toggleTrackPublic(track, options = {}) {
  if (!track) {
    return;
  }

  if (!options.skipConfirm) {
    openTrackVisibilityModal(track);
    return;
  }

  if (!state.user?.id) {
    showAppToast('ログイン中のアカウントでのみ公開設定を変更できます', 'error');
    return;
  }

  if (String(track.ownerId || '') !== String(state.user.id)) {
    showAppToast('自分がアップロードした音楽だけ公開状態を変更できます', 'error');
    return;
  }

  const nextIsPublic = !Boolean(track.isPublic);
  const previousIsPublic = Boolean(track.isPublic);

  track.isPublic = nextIsPublic;
  const libraryTrack = state.libraryTracks.find((item) => String(item.id) === String(track.id));
  if (libraryTrack) {
    libraryTrack.isPublic = nextIsPublic;
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client
        .from('video_uploads')
        .update({ is_public: nextIsPublic })
        .eq('id', track.id)
        .eq('owner_id', state.user.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      const missingVisibilityColumn = error && (error.code === '42703' || /is_public.*does not exist|column .*is_public.*does not exist/i.test(String(error.message || '')));
      if (missingVisibilityColumn) {
        track.isPublic = nextIsPublic;
        if (libraryTrack) {
          libraryTrack.isPublic = nextIsPublic;
        }
        logAppError('track visibility update failed; column missing in Supabase schema', error);
        showAppToast('公開状態は画面上で反映しました。Supabase の video_uploads に is_public 列を追加してください。', 'info');
        renderMyMusicMenu();
        renderRecentMusic();
        return;
      }

      track.isPublic = previousIsPublic;
      if (libraryTrack) {
        libraryTrack.isPublic = previousIsPublic;
      }
      logAppError('track visibility update failed', error);
      showAppToast('公開状態の保存に失敗しました', 'error');
      renderMyMusicMenu();
      return;
    }
  }

  renderMyMusicMenu();
  renderRecentMusic();
  showAppToast(nextIsPublic ? '音楽を公開しました' : '音楽を非公開にしました', 'success');
}

async function deleteTrack(track) {
  if (!track) {
    return;
  }

  if (!state.user?.id) {
    showAppToast('ログイン中のアカウントでのみ削除できます', 'error');
    return;
  }

  if (String(track.ownerId || '') !== String(state.user.id)) {
    showAppToast('自分がアップロードした音楽だけ削除できます', 'error');
    return;
  }

  const confirmed = window.confirm(`「${track.title || 'この音楽'}」を削除しますか？`);
  if (!confirmed) {
    return;
  }

  const client = getSupabaseClient();
  try {
    if (client) {
      const { error: favoriteDeleteError } = await client
        .from('track_favorites')
        .delete()
        .eq('track_id', track.id);
      if (favoriteDeleteError && favoriteDeleteError.code !== 'PGRST116') {
        throw favoriteDeleteError;
      }

      const { error: trackDeleteError } = await client
        .from('video_uploads')
        .delete()
        .eq('id', track.id)
        .eq('owner_id', state.user.id);
      if (trackDeleteError) {
        throw trackDeleteError;
      }
    }

    state.libraryTracks = state.libraryTracks.filter((item) => String(item.id) !== String(track.id));
    state.trackFavorites = state.trackFavorites.filter((id) => String(id) !== String(track.id));
    state.queue = state.queue.filter((item) => String(item.id) !== String(track.id));
    if (state.currentTrackIndex >= state.queue.length) {
      state.currentTrackIndex = Math.max(0, state.queue.length - 1);
    }

    renderMyMusicMenu();
    renderFavoriteMenu();
    renderFavoriteSongs();
    renderRecentMusic();
    renderQueue();
    showAppToast('音楽を削除しました', 'success');
  } catch (error) {
    logAppError('track delete failed', error);
    showAppToast('音楽の削除に失敗しました', 'error');
  }
}

async function togglePlaylistPublic(playlistId, options = {}) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const previousIsPublic = playlist.isPublic;
  const nextIsPublic = !previousIsPublic;
  const actionLabel = nextIsPublic ? '公開' : '非公開';

  if (!options.skipConfirm) {
    openPlaylistVisibilityModal(playlistId);
    return;
  }

  const client = getSupabaseClient();
  if (!client || !isPersistableSupabaseUser() || String(playlistId).startsWith('playlist-')) {
    showAppToast('ログイン中のアカウントでのみ公開設定を変更できます', 'error');
    return;
  }

  const { error } = await client
    .from('playlists')
    .update({ is_public: nextIsPublic })
    .eq('id', playlistId)
    .eq('owner_id', state.user.id);

  if (error) {
    logAppError('playlist visibility update failed', error);
    showAppToast('公開状態を保存できませんでした', 'error');
    return;
  }

  playlist.isPublic = nextIsPublic;
  saveLocalState();
  renderMyPlaylists();
  renderRecentPlaylists();
  renderPopularPlaylists();
  showAppToast(`「${playlist.name}」を${actionLabel}にしました`, 'success');
}

async function sharePlaylist(playlistId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) {
    return;
  }

  const url = `${window.location.origin}${window.location.pathname}?playlist=${encodeURIComponent(playlist.id)}`;
  try {
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      await navigator.share({
        title: playlist.name,
        text: `${playlist.name}を聞いてみませんか？`,
        url,
      });
      showAppToast('プレイリストの共有URLを開きました', 'success');
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      showAppToast('プレイリストの共有URLをコピーしました', 'success');
      return;
    }
  } catch (error) {
    logAppError('playlist share failed', error);
  }

  window.prompt('共有URLをコピーしてください', url);
  showAppToast('共有URLをコピー用に表示しました', 'info');
}

async function shareTrack(track) {
  if (!track) {
    return;
  }

  const url = `${window.location.origin}${window.location.pathname}?track=${encodeURIComponent(track.id)}`;
  try {
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      await navigator.share({
        title: `${track.title || '音楽'} - ${track.artist || '匿名アカウント'}`,
        text: `${track.title || '音楽'}を聞いてみませんか？`,
        url,
      });
      showAppToast('曲の共有URLを開きました', 'success');
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      showAppToast('曲の共有URLをコピーしました', 'success');
      return;
    }
  } catch (error) {
    logAppError('track share failed', error);
  }

  window.prompt('共有URLをコピーしてください', url);
  showAppToast('共有URLをコピー用に表示しました', 'info');
}

function openAuthModal() {
  if (elements.authModal) {
    elements.authModal.classList.remove('hidden');
    elements.authModal.setAttribute('aria-hidden', 'false');
  }
}

function closeAuthModal() {
  if (elements.authModal) {
    elements.authModal.classList.add('hidden');
    elements.authModal.setAttribute('aria-hidden', 'true');
  }
}

function openProfileModal() {
  if (!state.user || !elements.profileModal) {
    if (!state.user) {
      openAuthModal();
    }
    return;
  }

  const nickname = getUserNickname();
  const details = state.user.profile?.details || state.user.details || '';
  const icon = getUserIcon();

  if (elements.profileNicknameInput) {
    elements.profileNicknameInput.value = nickname;
  }
  if (elements.profileBioInput) {
    elements.profileBioInput.value = details;
  }
  if (elements.profileAvatarPreview) {
    elements.profileAvatarPreview.textContent = icon;
  }
  if (elements.profilePreviewName) {
    elements.profilePreviewName.textContent = nickname;
  }

  bindProfileIconOptions();

  elements.profileModal.classList.remove('hidden');
  elements.profileModal.setAttribute('aria-hidden', 'false');
}

function closeProfileModal() {
  if (elements.profileModal) {
    elements.profileModal.classList.add('hidden');
    elements.profileModal.setAttribute('aria-hidden', 'true');
  }
}

function closePublicProfileModal() {
  if (elements.publicProfileModal) {
    elements.publicProfileModal.classList.add('hidden');
    elements.publicProfileModal.setAttribute('aria-hidden', 'true');
  }
}

async function openPublicProfileModal(track) {
  if (!elements.publicProfileModal || !track) {
    return;
  }

  const ownerId = track.ownerId || '';
  const isCurrentUser = ownerId && ownerId === state.user?.id;
  const fallbackName = track.artist || '匿名アカウント';
  const fallbackIcon = track.artistIcon || '🎧';
  let profile = isCurrentUser ? {
    nickname: getUserNickname(),
    details: state.user?.profile?.details || state.user?.details || '',
    icon: getUserIcon(),
  } : null;

  if (elements.publicProfileName) elements.publicProfileName.textContent = profile?.nickname || fallbackName;
  if (elements.publicProfileAvatar) elements.publicProfileAvatar.textContent = profile?.icon || fallbackIcon;
  if (elements.publicProfileDetails) elements.publicProfileDetails.textContent = profile?.details || 'プロフィールの詳細はありません';
  if (elements.publicProfileMusicCount) elements.publicProfileMusicCount.textContent = '-';
  if (elements.publicProfilePlayCount) elements.publicProfilePlayCount.textContent = '-';
  if (elements.publicProfileFavoriteCount) elements.publicProfileFavoriteCount.textContent = '-';
  elements.publicProfileModal.classList.remove('hidden');
  elements.publicProfileModal.setAttribute('aria-hidden', 'false');

  await loadPublicProfileStats(ownerId);
  await loadPublicProfileContent(ownerId);

  if (!profile && ownerId) {
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client
        .from('profiles')
        .select('nickname, details, icon')
        .eq('id', ownerId)
        .maybeSingle();
      if (!error && data) {
        profile = data;
        if (elements.publicProfileName) elements.publicProfileName.textContent = data.nickname || fallbackName;
        if (elements.publicProfileAvatar) elements.publicProfileAvatar.textContent = data.icon || fallbackIcon;
        if (elements.publicProfileDetails) elements.publicProfileDetails.textContent = data.details || 'プロフィールの詳細はありません';
      } else if (elements.publicProfileDetails) {
        elements.publicProfileDetails.textContent = 'プロフィールの詳細を取得できませんでした';
      }
    }
  }
}

async function loadPublicProfileStats(ownerId) {
  if (!ownerId) {
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  let { data, error } = await client
    .from('video_uploads')
    .select('play_count, favorite_count')
    .eq('owner_id', ownerId);
  if (error?.code === '42703') {
    ({ data, error } = await client
      .from('video_uploads')
      .select('id')
      .eq('owner_id', ownerId));
  }
  if (error) {
    logAppError('public profile stats load failed', error);
    return;
  }

  const tracks = Array.isArray(data) ? data : [];
  const playCount = tracks.reduce((total, track) => total + (Number(track.play_count) || 0), 0);
  const favoriteCount = tracks.reduce((total, track) => total + (Number(track.favorite_count) || 0), 0);
  if (elements.publicProfileMusicCount) elements.publicProfileMusicCount.textContent = String(tracks.length);
  if (elements.publicProfilePlayCount) elements.publicProfilePlayCount.textContent = String(playCount);
  if (elements.publicProfileFavoriteCount) elements.publicProfileFavoriteCount.textContent = String(favoriteCount);
}

async function loadPublicProfileContent(ownerId) {
  if (elements.publicProfileMusicList) elements.publicProfileMusicList.innerHTML = '<p class="public-profile-loading">読み込み中...</p>';
  if (elements.publicProfilePlaylistsList) elements.publicProfilePlaylistsList.innerHTML = '<p class="public-profile-loading">読み込み中...</p>';
  if (!ownerId) return;

  const client = getSupabaseClient();
  if (!client) return;

  let [{ data: music, error: musicError }, { data: playlists, error: playlistsError }] = await Promise.all([
    client.from('video_uploads').select('id, title, thumbnail_url, file_url, public_id, created_at, play_count, favorite_count, owner_id').eq('owner_id', ownerId).order('created_at', { ascending: false }),
    client.from('playlists').select('id, name, description, icon, created_at').eq('owner_id', ownerId).eq('is_public', true).order('created_at', { ascending: false }),
  ]);

  if (musicError?.code === '42703') {
    ({ data: music, error: musicError } = await client
      .from('video_uploads')
      .select('id, title, thumbnail_url, file_url, public_id, created_at, owner_id')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false }));
  }

  if (musicError) logAppError('public profile music load failed', musicError);
  if (playlistsError) logAppError('public profile playlists load failed', playlistsError);

  const musicItems = (music || []).map((item) => normalizeTrackSnapshot({
    id: item.id,
    title: item.title,
    artist: '匿名アカウント',
    src: buildPlayableVideoUrl(item.file_url),
    thumbnail: item.thumbnail_url,
    publicId: item.public_id,
    createdAt: item.created_at,
    ownerId: item.owner_id,
    playCount: item.play_count,
    favoriteCount: item.favorite_count,
  }));

  if (elements.publicProfileMusicList) {
    elements.publicProfileMusicList.innerHTML = musicItems.length
      ? musicItems.map((track) => {
        const thumbnailStyle = track.thumbnail
          ? `style="background-image: url('${track.thumbnail}'); background-size: cover; background-position: center;"`
          : '';
        return `<button class="public-profile-track" type="button" data-public-track-id="${track.id}"><span ${thumbnailStyle}>${track.thumbnail ? '' : '♪'}</span><strong>${track.title}</strong><small>${formatDateLabel(track.createdAt) || '-'}</small></button>`;
      }).join('')
      : '<p class="public-profile-empty">公開された音楽はありません</p>';
    elements.publicProfileMusicList.querySelectorAll('[data-public-track-id]').forEach((button) => {
      button.addEventListener('click', () => addTrackToQueueAndPlay(musicItems.find((track) => String(track.id) === button.dataset.publicTrackId)));
    });
  }

  if (elements.publicProfilePlaylistsList) {
    elements.publicProfilePlaylistsList.innerHTML = playlists?.length
      ? playlists.map((playlist) => `<div class="public-profile-playlist"><span>${playlist.icon || '♫'}</span><div><strong>${playlist.name}</strong><small>${playlist.description || '公開プレイリスト'} · ${formatDateLabel(playlist.created_at) || '-'}</small></div></div>`).join('')
      : '<p class="public-profile-empty">公開されたプレイリストはありません</p>';
  }
}

function updateProfilePreview() {
  const nickname = elements.profileNicknameInput?.value?.trim() || getUserNickname();
  const icon = elements.profileIconOptions?.querySelector('.icon-option.is-selected')?.dataset.icon || getUserIcon();

  if (elements.profileAvatarPreview) {
    elements.profileAvatarPreview.textContent = icon;
  }
  if (elements.profilePreviewName) {
    elements.profilePreviewName.textContent = nickname;
  }
}

function saveProfileFromForm(event) {
  event.preventDefault();

  if (!state.user) {
    return;
  }

  const nickname = (elements.profileNicknameInput?.value || '').trim() || state.user.profile?.nickname || getUserNickname() || generateRandomNickname();
  const details = (elements.profileBioInput?.value || '').trim();
  const icon = elements.profileIconOptions?.querySelector('.icon-option.is-selected')?.dataset.icon || getUserIcon();

  state.user.profile = { nickname, details, icon };
  state.user.nickname = nickname;
  state.user.name = nickname;
  state.user.details = details;
  state.user.icon = icon;

  saveLocalState();
  if (isSupabaseConfigured()) {
    saveStateToSupabase();
  }
  updateAuthUI();
  closeProfileModal();
}

function bindProfileIconOptions() {
  if (!elements.profileIconOptions) {
    return;
  }

  const track = elements.profileIconOptions.querySelector('.carousel-track');
  if (!track) {
    return;
  }

  track.innerHTML = '';

  PROFILE_ICON_CATEGORIES.forEach((category) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'carousel-category';

    const label = document.createElement('span');
    label.className = 'carousel-category-label';
    label.textContent = category.label;
    categoryDiv.appendChild(label);

    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'carousel-category-icons';

    category.icons.forEach((icon) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'icon-option';
      button.dataset.icon = icon;
      button.textContent = icon;
      button.addEventListener('click', () => {
        const allButtons = track.querySelectorAll('.icon-option');
        allButtons.forEach((btn) => btn.classList.remove('is-selected'));
        button.classList.add('is-selected');
        updateProfilePreview();
      });

      if (icon === getUserIcon()) {
        button.classList.add('is-selected');
      }

      iconsContainer.appendChild(button);
    });

    categoryDiv.appendChild(iconsContainer);
    track.appendChild(categoryDiv);
  });
}

async function saveStateToSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  const nickname = (state.user.nickname || state.user.profile?.nickname || generateRandomNickname()).trim() || generateRandomNickname();
  const payload = {
    id: state.user.id,
    email: state.user.email || 'user@example.com',
    nickname,
    details: state.user.details || '',
    icon: state.user.icon || '🎧',
    updated_at: new Date().toISOString(),
  };

  const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
  if (error) {
    logAppError('profile save failed', error);
    return false;
  }

  return true;
}

async function hydrateProfileFromSupabase(userId) {
  const client = getSupabaseClient();
  if (!client || !userId) {
    return false;
  }

  const { data, error } = await client.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      logAppError('profile hydration failed', error);
    }
    const fallbackUser = ensureRandomNicknameForUser(state.user || { id: userId, email: 'user@example.com' });
    state.user = fallbackUser;
    saveLocalState();
    if (isSupabaseConfigured()) {
      await saveStateToSupabase();
    }
    return false;
  }

  if (!state.user) {
    state.user = normalizeUserProfile({ id: userId, email: data.email });
  }

  const nextNickname = (data.nickname || state.user.nickname || '').trim() || generateRandomNickname();
  state.user.profile = {
    nickname: nextNickname,
    details: data.details || '',
    icon: data.icon || state.user.icon || '🎧',
  };
  state.user.nickname = nextNickname;
  state.user.name = nextNickname;
  state.user.details = state.user.profile.details;
  state.user.icon = state.user.profile.icon;

  if (!data.nickname) {
    await saveStateToSupabase();
  }

  saveLocalState();
  return true;
}

async function loadSupabasePlaylists() {
  if (state.playlistsLoading) {
    return false;
  }

  if (state.playlistPermissionDenied) {
    return false;
  }

  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  state.playlistsLoading = true;

  try {
    const isRealSupabaseUser = Boolean(state.user?.id && /^[0-9a-fA-F-]{36}$/.test(String(state.user.id)));
    const playlistQuery = client
      .from('playlists')
      .select('id, name, description, icon, is_public, created_at, owner_id, playlist_items(*)')
      .order('created_at', { ascending: false });
    const { data: initialData, error: initialError } = isRealSupabaseUser
      ? await playlistQuery.or(`owner_id.eq.${state.user.id},is_public.eq.true`)
      : await playlistQuery.eq('is_public', true);
    let data = initialData;
    let error = initialError;

    if (error?.code === '42703') {
      const fallbackQuery = client
        .from('playlists')
        .select('id, name, description, is_public, created_at, owner_id, playlist_items(*)')
        .order('created_at', { ascending: false });
      ({ data, error } = isRealSupabaseUser
        ? await fallbackQuery.or(`owner_id.eq.${state.user.id},is_public.eq.true`)
        : await fallbackQuery.eq('is_public', true));
    }

    if (error) {
      if (error.code === '42501') {
        state.playlistPermissionDenied = true;
        logAppError('playlist permissions missing', error);
        return false;
      }

      logAppError('playlist load failed', error);
      return false;
    }

    const mapped = (data || []).map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      icon: playlist.icon || '♫',
      description: playlist.description || '',
      items: (playlist.playlist_items || []).map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.artist || 'Family',
        genre: item.genre || 'Music',
        src: item.src,
        description: item.description || '',
      })),
      isPublic: Boolean(playlist.is_public),
      ownerId: playlist.owner_id || '',
      ownerName: playlist.owner_id === state.user?.id ? getUserNickname() : '匿名アカウント',
      ownerIcon: playlist.owner_id === state.user?.id ? getUserIcon() : '🎧',
      createdAt: new Date(playlist.created_at).getTime(),
      favoriteCount: 0,
    }));

    if (state.user?.id) {
      const { data: favoriteRows, error: favoriteError } = await client
        .from('favorite_playlists')
        .select('playlist_id')
        .eq('user_id', state.user.id);
      if (!favoriteError) {
        state.favorites = (favoriteRows || []).map((row) => row.playlist_id);
      } else {
        logAppError('favorite playlists load failed', favoriteError);
      }
    } else {
      state.favorites = [];
    }

    const { data: allFavoriteRows, error: allFavoriteError } = await client
      .from('favorite_playlists')
      .select('playlist_id');

    if (!allFavoriteError) {
      const favoriteCounts = (allFavoriteRows || []).reduce((counts, row) => {
        const playlistId = row.playlist_id;
        counts[playlistId] = (counts[playlistId] || 0) + 1;
        return counts;
      }, {});

      mapped.forEach((playlist) => {
        playlist.favoriteCount = Number(favoriteCounts[playlist.id] || 0);
      });
    } else {
      logAppError('favorite playlist counts load failed', allFavoriteError);
    }

    await hydratePublicPlaylistOwners(mapped);
    await refreshPlaylistFavoriteCountsFromSupabase(mapped);

    if (mapped.length) {
      state.playlists = mapped;
      state.currentPlaylistId = state.currentPlaylistId || mapped[0].id;
      saveLocalState();
      renderMyPlaylists();
      renderRecentPlaylists();
      renderPopularPlaylists();
      renderUploadPlaylistOptions();
      renderFavoritePlaylists();
      return true;
    }

    return false;
  } finally {
    state.playlistsLoading = false;
  }
}

async function hydratePublicPlaylistOwners(playlists) {
  const client = getSupabaseClient();
  const ownerIds = [...new Set(playlists.map((playlist) => playlist.ownerId).filter(Boolean))];
  if (!client || !ownerIds.length) {
    return;
  }

  const { data, error } = await client
    .from('profiles')
    .select('id, nickname, icon')
    .in('id', ownerIds);
  if (error) {
    logAppError('playlist owners load failed', error);
    return;
  }

  const profiles = new Map((data || []).map((profile) => [profile.id, profile]));
  playlists.forEach((playlist) => {
    const profile = profiles.get(playlist.ownerId);
    if (profile) {
      playlist.ownerName = profile.nickname || '匿名アカウント';
      playlist.ownerIcon = profile.icon || '🎧';
    }
  });
}

async function signInWithProvider(providerName) {
  const loaded = await ensureSupabaseLoaded();
  if (!loaded) {
    return false;
  }

  const client = getSupabaseClient();
  if (!client) {
    return false;
  }

  const provider = ['google', 'github'].includes(providerName) ? providerName : getConfiguredAuthProvider();
  const options = {
    redirectTo: window.location.origin,
  };

  if (provider === 'google') {
    options.queryParams = { prompt: 'select_account' };
  }

  try {
    const { error } = await client.auth.signInWithOAuth({ provider, options });
    if (error) {
      logAppError(`Supabase ${provider} login failed`, error);
      return false;
    }
  } catch (error) {
    logAppError(`Supabase ${provider} login threw`, error);
    return false;
  }

  return true;
}

async function handleLogin(providerName) {
  if (!isSupabaseConfigured()) {
    loginAsMockUser();
    return;
  }

  state.authLoading = true;
  updateAuthUI();
  closeAuthModal();

  const loginSucceeded = await signInWithProvider(providerName);
  if (!loginSucceeded) {
    state.authLoading = false;
    updateAuthUI();
    alert('Googleログインに失敗しました。Supabase の設定とブラウザのポップアップ許可を確認してください。');
    return;
  }

  window.setTimeout(() => {
    if (state.authLoading && !state.user) {
      state.authLoading = false;
      updateAuthUI();
    }
  }, 15000);
}

async function initializeSupabaseSession() {
  if (state.sessionHydrating) {
    return;
  }

  if (!isSupabaseConfigured()) {
    state.authLoading = false;
    updateAuthUI();
    return;
  }

  const loaded = await ensureSupabaseLoaded();
  if (!loaded) {
    state.authLoading = false;
    updateAuthUI();
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    state.authLoading = false;
    updateAuthUI();
    return;
  }

  if (!state.authListenerAttached) {
    client.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_OUT' || event === 'USER_DELETED' || !session?.user) {
          state.user = null;
          state.authLoading = false;
          saveLocalState();
          updateAuthUI();
          return;
        }

        const authUser = session.user;
        applyUserProfile(authUser);
        const shouldShowAuthLoading = event === 'INITIAL_SESSION' || event === 'SIGNED_IN';
        if (shouldShowAuthLoading) {
          state.authLoading = true;
          updateAuthUI();
        }

        await hydrateProfileFromSupabase(authUser.id);
        await loadSupabasePlaylists();
        await loadCloudUploadsFromSupabase();
        if (!hasSharedPlaylistQuery()) {
          await hydrateLastPlayedTrackFromSupabase();
        }
        subscribeToVideoUploads();
        if (shouldShowAuthLoading) {
          state.authLoading = false;
        }
        saveLocalState();
        updateAuthUI();
      } catch (error) {
        logAppError('Supabase auth state update failed', error);
        state.authLoading = false;
        updateAuthUI();
      }
    });
    state.authListenerAttached = true;
  }

  try {
    state.sessionHydrating = true;
    const { data, error } = await client.auth.getSession();
    if (error) {
      logAppError('getSession failed', error);
      state.authLoading = false;
      updateAuthUI();
      return;
    }

    if (data?.session?.user) {
      applyUserProfile(data.session.user);
      state.authLoading = true;
      updateAuthUI();
      await hydrateProfileFromSupabase(data.session.user.id);
      await loadSupabasePlaylists();
      await loadCloudUploadsFromSupabase();
      if (!hasSharedPlaylistQuery()) {
        await hydrateLastPlayedTrackFromSupabase();
      }
      subscribeToVideoUploads();
    } else {
      await loadSupabasePlaylists();
      await loadCloudUploadsFromSupabase();
      subscribeToVideoUploads();
    }
  } catch (error) {
    logAppError('Session hydration failed', error);
  } finally {
    state.sessionHydrating = false;
  }

  state.authLoading = false;
  updateAuthUI();
}

const DEBUG_MODE = Boolean(
  window.location.hostname === 'localhost' ||
  new URLSearchParams(window.location.search).get('debug') === '1'
);

function logAppError(label, error) {
  if (DEBUG_MODE && console && typeof console.error === 'function') {
    console.error(label, error);
  }
}

function loadScript({ src, id }) {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }

      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

async function ensureSupabaseLoaded() {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    return true;
  }

  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    await loadScript({
      id: 'supabase-sdk-loader',
      src: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
    });
    return Boolean(window.supabase && typeof window.supabase.createClient === 'function');
  } catch (error) {
    logAppError('Supabase SDK load failed', error);
    return false;
  }
}

function updateAuthUI() {
  const authenticated = Boolean(state.user) && !state.authLoading;
  const authenticationJustCompleted = authenticated && !state.uiAuthenticated;
  state.uiAuthenticated = authenticated;
  const configured = isSupabaseConfigured();
  const showAuthButtons = !state.authLoading && !authenticated && configured;

  if (document.body) {
    document.body.classList.toggle('auth-loading', state.authLoading);
  }

  if (elements.authLoadingShell) {
    elements.authLoadingShell.classList.toggle('hidden', !state.authLoading);
  }

  if (elements.loginGoogleBtn) {
    elements.loginGoogleBtn.classList.toggle('hidden', !showAuthButtons);
  }
  if (elements.loginGithubBtn) {
    elements.loginGithubBtn.classList.toggle('hidden', !showAuthButtons);
  }

  syncEmptyCloudState();

  if (elements.userBadge) {
    elements.userBadge.classList.toggle('hidden', state.authLoading || !authenticated && !state.user);
  }

  if (state.authLoading) {
    if (elements.userBadge) {
      elements.userBadge.innerHTML = '<span class="user-badge-icon" aria-hidden="true">⏳</span><span>認証確認中...</span>';
    }
    setText(elements.authHint, '認証中です。しばらくお待ちください。');
    setText(elements.authHintMember, '認証中です。しばらくお待ちください。');
    if (elements.anonymousView) elements.anonymousView.classList.add('hidden');
    if (elements.memberView) elements.memberView.classList.add('hidden');
    if (elements.logoutBtn) elements.logoutBtn.classList.add('hidden');
    if (elements.loginSelectBtn) elements.loginSelectBtn.classList.add('hidden');
    return;
  }

  if (authenticated) {
    if (authenticationJustCompleted) {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    }
    const badgeText = `${getUserNickname()}さん`;
    if (elements.userBadge) {
      const userIcon = getUserIcon();
      elements.userBadge.innerHTML = `<span class="user-badge-icon" aria-hidden="true">${userIcon}</span><span>${badgeText}</span>`;
      elements.userBadge.classList.remove('hidden');
    }
    setText(elements.authHint, '');
    setText(elements.authHintMember, '');
    if (elements.featuredMode) elements.featuredMode.textContent = 'みんなのおすすめ';
    if (elements.featuredModeRight) elements.featuredModeRight.textContent = 'みんなのおすすめ';
    if (elements.anonymousView) elements.anonymousView.classList.add('hidden');
    if (elements.memberView) elements.memberView.classList.remove('hidden');
  } else {
    if (elements.userBadge) {
      elements.userBadge.innerHTML = '<span class="user-badge-icon" aria-hidden="true">🎧</span><span>匿名アカウント</span>';
      elements.userBadge.classList.remove('hidden');
    }
    setText(elements.authHint, '匿名ユーザーとして利用中です。ログインするとプレイリスト作成とアップロードができます。');
    setText(elements.authHintMember, '匿名モードです。ログインすると音楽のアップロード機能が使えます。');
    if (elements.featuredMode) elements.featuredMode.textContent = '公開されている音楽';
    if (elements.featuredModeRight) elements.featuredModeRight.textContent = 'みんなのおすすめ';
    if (elements.anonymousView) elements.anonymousView.classList.add('hidden');
    if (elements.memberView) elements.memberView.classList.remove('hidden');
  }

  elements.memberView?.classList.toggle('is-anonymous', !authenticated);

  if (elements.logoutBtn) {
    elements.logoutBtn.classList.toggle('hidden', !authenticated);
  }

  if (elements.loginSelectBtn) {
    elements.loginSelectBtn.classList.toggle('hidden', authenticated);
  }

  if (elements.videoUploadInput) {
    elements.videoUploadInput.disabled = !authenticated;
    elements.videoUploadInput.parentElement?.classList.toggle('disabled', !authenticated);
  }
  if (elements.uploadSubmitBtn) {
    elements.uploadSubmitBtn.disabled = !authenticated || !state.pendingUploadFiles.length || state.uploading;
  }

  const favoritePlaylistCard = elements.favoritePlaylistList?.closest('.sidebar-card');
  if (favoritePlaylistCard) {
    favoritePlaylistCard.classList.toggle('hidden', !authenticated);
  }

  renderFavoritePlaylists();
  renderMyPlaylists();
  renderUploadPlaylistOptions();
}

function setActiveNavScreen(screenName) {
  const screens = [
    { key: 'home', el: elements.homeScreen },
    { key: 'my-music', el: elements.myMusicScreen },
    { key: 'favorite', el: elements.favoriteScreen },
  ];

  const nextScreen = screens.some(({ key }) => key === screenName) ? screenName : 'home';
  state.activeScreen = nextScreen;

  screens.forEach(({ key, el }) => {
    const isActive = key === nextScreen;
    if (el) {
      el.classList.toggle('hidden', !isActive);
    }
  });

  const navButtons = [
    elements.navHomeBtn,
    elements.navMyMusicBtn,
    elements.navFavoriteBtn,
  ];

  navButtons.forEach((button) => {
    if (!button) {
      return;
    }
    const isActive = button.dataset.navScreen === nextScreen;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function restoreActiveScreen() {
  const screen = ['home', 'my-music', 'favorite'].includes(state.activeScreen) ? state.activeScreen : 'home';
  setActiveNavScreen(screen);
}

function bindEvents() {
  if (elements.navHomeBtn) {
    elements.navHomeBtn.addEventListener('click', () => setActiveNavScreen('home'));
  }
  if (elements.navMyMusicBtn) {
    elements.navMyMusicBtn.addEventListener('click', () => setActiveNavScreen('my-music'));
  }
  if (elements.sidebarToggleBtn) {
    elements.sidebarToggleBtn.addEventListener('click', () => {
      const app = document.querySelector('.music-app');
      const expanded = app?.classList.toggle('sidebar-expanded') || false;
      elements.sidebarToggleBtn.setAttribute('aria-expanded', String(expanded));
      elements.sidebarToggleBtn.setAttribute('aria-label', expanded ? 'メニューを折りたたむ' : 'メニューを展開');
      elements.sidebarToggleBtn.title = expanded ? 'メニューを折りたたむ' : 'メニューを展開';
    });
  }

  if (elements.closeAuthModalBtn) {
    elements.closeAuthModalBtn.addEventListener('click', closeAuthModal);
  }

  document.querySelector('[data-close-auth-modal="true"]')?.addEventListener('click', closeAuthModal);

  if (elements.loginSelectBtn) {
    elements.loginSelectBtn.addEventListener('click', openAuthModal);
  }

  if (elements.anonymousLoginBtn) {
    elements.anonymousLoginBtn.addEventListener('click', openAuthModal);
  }

  if (elements.loginGoogleBtn) {
    elements.loginGoogleBtn.addEventListener('click', () => handleLogin('google'));
  }

  if (elements.loginGithubBtn) {
    elements.loginGithubBtn.addEventListener('click', () => handleLogin('github'));
  }

  if (elements.userBadge) {
    elements.userBadge.addEventListener('click', openProfileModal);
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', logoutUser);
  }

  if (elements.clearQueueBtn) {
    elements.clearQueueBtn.addEventListener('click', clearQueue);
  }

  const queueCard = document.querySelector('.queue-card');
  const queueCardHeader = queueCard?.querySelector('.queue-card-header');
  const toggleQueueCard = () => {
    if (!queueCard || !queueCardHeader) {
      return;
    }
    const isCollapsed = queueCard.classList.toggle('is-collapsed');
    queueCardHeader.setAttribute('aria-expanded', String(!isCollapsed));
  };

  queueCardHeader?.addEventListener('click', (event) => {
    if (event.target.closest('button')) {
      return;
    }
    toggleQueueCard();
  });

  queueCardHeader?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    toggleQueueCard();
  });

  if (elements.closeProfileModalBtn) {
    elements.closeProfileModalBtn.addEventListener('click', closeProfileModal);
  }

  if (elements.cancelProfileBtn) {
    elements.cancelProfileBtn.addEventListener('click', closeProfileModal);
  }

  if (elements.closePublicProfileModalBtn) {
    elements.closePublicProfileModalBtn.addEventListener('click', closePublicProfileModal);
  }

  document.querySelector('[data-close-profile-modal="true"]')?.addEventListener('click', closeProfileModal);
  document.querySelector('[data-close-public-profile="true"]')?.addEventListener('click', closePublicProfileModal);

  if (elements.profileForm) {
    elements.profileForm.addEventListener('submit', saveProfileFromForm);
  }

  if (elements.profileNicknameInput) {
    elements.profileNicknameInput.addEventListener('input', updateProfilePreview);
  }

  if (elements.topSearchInput) {
    elements.topSearchInput.addEventListener('input', renderTopSearchResults);
  }

  if (elements.playerDescriptionToggle) {
    elements.playerDescriptionToggle.addEventListener('click', () => {
      const isExpanded = elements.playerDescriptionText?.classList.toggle('is-expanded') || false;
      elements.playerDescriptionToggle.classList.toggle('is-expanded', isExpanded);
      elements.playerDescriptionToggle.textContent = isExpanded ? '閉じる' : 'すべて見る';
      elements.playerDescriptionToggle.setAttribute('aria-expanded', String(isExpanded));
    });
  }

  if (elements.playerArtist) {
    elements.playerArtist.addEventListener('click', () => {
      openPublicProfileModal(state.queue[state.currentTrackIndex]);
    });
  }

  if (elements.playerFavoriteBtn) {
    elements.playerFavoriteBtn.addEventListener('click', () => {
      toggleTrackFavorite(state.queue[state.currentTrackIndex]);
    });
  }

  if (elements.playerShareBtn) {
    elements.playerShareBtn.addEventListener('click', () => {
      const activeTrack = state.queue[state.currentTrackIndex] || state.lastPlayedTrack;
      if (activeTrack) {
        shareTrack(activeTrack);
      }
    });
  }

  if (elements.publicProfileMusicTab && elements.publicProfilePlaylistsTab) {
    const setPublicProfileTab = (tab) => {
      const showMusic = tab === 'music';
      elements.publicProfileMusicTab.classList.toggle('is-active', showMusic);
      elements.publicProfilePlaylistsTab.classList.toggle('is-active', !showMusic);
      elements.publicProfileMusicTab.setAttribute('aria-selected', String(showMusic));
      elements.publicProfilePlaylistsTab.setAttribute('aria-selected', String(!showMusic));
      elements.publicProfileMusicList?.classList.toggle('hidden', !showMusic);
      elements.publicProfilePlaylistsList?.classList.toggle('hidden', showMusic);
    };
    elements.publicProfileMusicTab.addEventListener('click', () => setPublicProfileTab('music'));
    elements.publicProfilePlaylistsTab.addEventListener('click', () => setPublicProfileTab('playlists'));
  }

  if (elements.playAllRecentMusicBtn) {
    elements.playAllRecentMusicBtn.addEventListener('click', () => {
      queueTracksAndPlay(Array.isArray(state.libraryTracks) ? state.libraryTracks : []);
    });
  }

  if (elements.playAllMonthlyMusicBtn) {
    elements.playAllMonthlyMusicBtn.addEventListener('click', () => {
      queueTracksAndPlay(getMonthlyPopularTracks());
    });
  }

  if (elements.playAllFavoriteMusicBtn) {
    elements.playAllFavoriteMusicBtn.addEventListener('click', () => {
      queueTracksAndPlay(getFavoriteMusicTracks());
    });
  }

  if (elements.videoUploadInput) {
    elements.videoUploadInput.addEventListener('change', () => {
      const files = Array.from(elements.videoUploadInput.files || []);
      if (!files.length) {
        return;
      }

      const firstTitle = files[0].name.replace(/\.[^/.]+$/, '') || 'Uploaded track';
      if (elements.uploadTitleInput) {
        elements.uploadTitleInput.value = firstTitle;
      }
      state.pendingUploadFiles = files;
      elements.videoUploadInput.closest('.hero-copy')?.querySelector('.upload-metadata')?.classList.remove('hidden');
      if (elements.uploadSubmitBtn) {
        elements.uploadSubmitBtn.disabled = !state.user;
      }
      setUploadStatus('内容を入力して公開ボタンを押してください。', { uploading: false });
    });
  }

  if (elements.uploadSubmitBtn) {
    elements.uploadSubmitBtn.addEventListener('click', async () => {
      const files = state.pendingUploadFiles;
      if (!files.length || !state.user || state.uploading) {
        return;
      }

      try {
        showAppToast('安全なクラウドに保存中です', 'info', { duration: 0 });
            const uploadedTracks = await uploadVideoFilesToCloudinary(files, {
          title: elements.uploadTitleInput?.value || '',
          description: elements.uploadDescriptionInput?.value || '',
          playlistIds: getSelectedPlaylistIds(elements.uploadPlaylistSelect),
        });

        state.libraryTracks = [...uploadedTracks, ...(Array.isArray(state.libraryTracks) ? state.libraryTracks : [])];
        renderMyMusicMenu();
        renderFavoriteMenu();
        renderRecentMusic();
        renderQueue();
        renderUploadPlaylistOptions();
        syncEmptyCloudState();
        setUploadStatus(`アップロード完了: ${uploadedTracks.length}件`, { uploading: false, percent: 100 });
        state.pendingUploadFiles = [];
        clearUploadForm();
        showAppToast(`${uploadedTracks.length}件を安全なクラウドに保存しました`, 'success');
      } catch (error) {
        logAppError('music upload failed', error);
        setUploadStatus(`アップロード失敗: ${error.message || '不明なエラー'}`, { uploading: false });
        showAppToast(`保存に失敗しました: ${error.message || '不明なエラー'}`, 'error');
      }
    });
  }

  if (elements.queuePlaylistAddToggleBtn) {
    elements.queuePlaylistAddToggleBtn.addEventListener('click', () => {
      openQueuePlaylistModal();
    });
  }

  if (elements.mobileQueueToggleBtn) {
    elements.mobileQueueToggleBtn.addEventListener('click', () => {
      const rightSidebar = document.querySelector('.right-sidebar');
      rightSidebar?.classList.add('is-mobile-open');
      rightSidebar?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      elements.mobileQueueToggleBtn.setAttribute('aria-expanded', 'true');
    });
  }

  if (elements.mobileQueueCloseBtn) {
    elements.mobileQueueCloseBtn.addEventListener('click', () => {
      document.querySelector('.right-sidebar')?.classList.remove('is-mobile-open');
      elements.mobileQueueToggleBtn?.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelector('.brand-block')?.addEventListener('click', () => {
    const rightSidebar = document.querySelector('.right-sidebar');
    if (rightSidebar?.classList.contains('is-mobile-open')) {
      rightSidebar.classList.remove('is-mobile-open');
      elements.mobileQueueToggleBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (event) => {
    const rightSidebar = document.querySelector('.right-sidebar');
    if (!rightSidebar?.classList.contains('is-mobile-open')) {
      return;
    }
    if (event.target.closest('.right-sidebar, #mobileQueueToggleBtn')) {
      return;
    }
    rightSidebar.classList.remove('is-mobile-open');
    elements.mobileQueueToggleBtn?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    const rightSidebar = document.querySelector('.right-sidebar');
    if (rightSidebar?.classList.contains('is-mobile-open')) {
      rightSidebar.classList.remove('is-mobile-open');
      elements.mobileQueueToggleBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  if (elements.addQueueToPlaylistBtn) {
    elements.addQueueToPlaylistBtn.addEventListener('click', () => {
      addQueueTracksToPlaylist(elements.queueModalAddMode?.value || 'current');
    });
  }

  if (elements.closeQueuePlaylistModalBtn) {
    elements.closeQueuePlaylistModalBtn.addEventListener('click', closeQueuePlaylistModal);
  }
  if (elements.queuePlaylistModalSearch) {
    elements.queuePlaylistModalSearch.addEventListener('input', renderQueuePlaylistModalList);
  }
  if (elements.queuePlaylistModalNewBtn) {
    elements.queuePlaylistModalNewBtn.addEventListener('click', () => {
      state.returnToQueuePlaylistModal = true;
      closeQueuePlaylistModal();
      openPlaylistManagerModal();
    });
  }
  document.querySelector('[data-close-queue-playlist="true"]')?.addEventListener('click', closeQueuePlaylistModal);

  document.querySelectorAll('[data-toggle-panel]').forEach((button) => {
    const togglePanel = () => {
      const panelKey = button.dataset.togglePanel;
      const panel = document.querySelector(`[data-panel="${panelKey}"]`);
      if (!panel) {
        return;
      }
      const isHidden = panel.classList.toggle('hidden');
      panel.closest('.sidebar-list-card')?.classList.toggle('is-collapsed', isHidden);
      const isExpanded = !isHidden;
      button.setAttribute('aria-expanded', String(isExpanded));
      button.classList.toggle('is-open', isExpanded);
    };

    button.closest('.panel-head')?.addEventListener('click', togglePanel);
  });

  if (elements.uploadPlaylistSearch) {
    elements.uploadPlaylistSearch.addEventListener('input', renderUploadPlaylistOptions);
  }

  if (elements.uploadPlaylistSort) {
    elements.uploadPlaylistSort.addEventListener('change', renderUploadPlaylistOptions);
  }

  if (elements.uploadNewPlaylistBtn) {
    elements.uploadNewPlaylistBtn.addEventListener('click', addUploadPlaylist);
  }

  if (elements.closePlaylistManagerBtn) {
    elements.closePlaylistManagerBtn.addEventListener('click', () => {
      closePlaylistManagerAndReturn();
    });
  }

  if (elements.playlistManagerSearch) {
    elements.playlistManagerSearch.addEventListener('input', renderPlaylistManagerList);
  }

  if (elements.playlistManagerSort) {
    elements.playlistManagerSort.addEventListener('change', renderPlaylistManagerList);
  }

  if (elements.newPlaylistNameInput) {
    elements.newPlaylistNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        createPlaylistFromManager();
      }
    });
  }

  if (elements.createPlaylistFromManagerBtn) {
    elements.createPlaylistFromManagerBtn.addEventListener('click', createPlaylistFromManager);
  }

  document.querySelector('[data-close-playlist-manager="true"]')?.addEventListener('click', () => {
    closePlaylistManagerAndReturn();
  });

  if (elements.closePlaylistRenameBtn) {
    elements.closePlaylistRenameBtn.addEventListener('click', closePlaylistRenameModal);
  }

  if (elements.cancelPlaylistRenameBtn) {
    elements.cancelPlaylistRenameBtn.addEventListener('click', closePlaylistRenameModal);
  }

  if (elements.savePlaylistRenameBtn) {
    elements.savePlaylistRenameBtn.addEventListener('click', () => {
      if (state.renamingPlaylistId) {
        renamePlaylist(state.renamingPlaylistId);
      }
    });
  }

  if (elements.playlistRenameInput) {
    elements.playlistRenameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        elements.savePlaylistRenameBtn?.click();
      }
    });
  }

  if (elements.playlistRenameIconSelect) {
    elements.playlistRenameIconSelect.addEventListener('change', () => {
      const iconPreview = elements.playlistRenameModal?.querySelector('.playlist-rename-icon');
      if (iconPreview) {
        iconPreview.textContent = elements.playlistRenameIconSelect.value;
      }
    });
  }

  document.querySelector('[data-close-playlist-rename="true"]')?.addEventListener('click', closePlaylistRenameModal);

  if (elements.closePlaylistDeleteBtn) {
    elements.closePlaylistDeleteBtn.addEventListener('click', closePlaylistDeleteModal);
  }

  if (elements.cancelPlaylistDeleteBtn) {
    elements.cancelPlaylistDeleteBtn.addEventListener('click', closePlaylistDeleteModal);
  }

  if (elements.confirmPlaylistDeleteBtn) {
    elements.confirmPlaylistDeleteBtn.addEventListener('click', () => {
      if (state.deletingPlaylistId) {
        deletePlaylist(state.deletingPlaylistId);
      }
    });
  }

  document.querySelector('[data-close-playlist-delete="true"]')?.addEventListener('click', closePlaylistDeleteModal);

  if (elements.closeFavoriteClearBtn) {
    elements.closeFavoriteClearBtn.addEventListener('click', closeFavoriteClearModal);
  }

  if (elements.cancelFavoriteClearBtn) {
    elements.cancelFavoriteClearBtn.addEventListener('click', closeFavoriteClearModal);
  }

  if (elements.confirmFavoriteClearBtn) {
    elements.confirmFavoriteClearBtn.addEventListener('click', async () => {
      closeFavoriteClearModal();
      await clearAllFavoriteSongs({ skipConfirm: true });
    });
  }

  document.querySelector('[data-close-favorite-clear="true"]')?.addEventListener('click', closeFavoriteClearModal);

  if (elements.closePlaylistVisibilityBtn) {
    elements.closePlaylistVisibilityBtn.addEventListener('click', closePlaylistVisibilityModal);
  }

  if (elements.cancelPlaylistVisibilityBtn) {
    elements.cancelPlaylistVisibilityBtn.addEventListener('click', closePlaylistVisibilityModal);
  }

  if (elements.confirmPlaylistVisibilityBtn) {
    elements.confirmPlaylistVisibilityBtn.addEventListener('click', async () => {
      const trackId = state.visibilityConfirmTrackId;
      if (trackId) {
        const track = state.libraryTracks.find((item) => String(item.id) === String(trackId));
        closePlaylistVisibilityModal();
        if (track) {
          await toggleTrackPublic(track, { skipConfirm: true });
        }
        return;
      }

      const playlistId = state.visibilityConfirmPlaylistId;
      if (!playlistId) {
        return;
      }

      closePlaylistVisibilityModal();
      await togglePlaylistPublic(playlistId, { skipConfirm: true });
    });
  }

  if (elements.closeTrackEditBtn) {
    elements.closeTrackEditBtn.addEventListener('click', closeTrackEditModal);
  }
  if (elements.cancelTrackEditBtn) {
    elements.cancelTrackEditBtn.addEventListener('click', closeTrackEditModal);
  }
  document.querySelector('[data-close-track-edit="true"]')?.addEventListener('click', closeTrackEditModal);
  if (elements.trackEditPlaylistSearch) {
    elements.trackEditPlaylistSearch.addEventListener('input', renderTrackEditPlaylistOptions);
  }
  if (elements.trackEditPlaylistSort) {
    elements.trackEditPlaylistSort.addEventListener('change', renderTrackEditPlaylistOptions);
  }
  if (elements.trackEditNewPlaylistBtn) {
    elements.trackEditNewPlaylistBtn.addEventListener('click', () => {
      if (!state.user) {
        showAppToast('ログインするとプレイリストを作成できます', 'error');
        return;
      }
      openPlaylistManagerModal();
    });
  }
  if (elements.saveTrackEditBtn) {
    elements.saveTrackEditBtn.addEventListener('click', async () => {
      const trackId = state.editingTrackId;
      if (!trackId) {
        return;
      }

      const track = state.libraryTracks.find((item) => String(item.id) === String(trackId));
      if (!track) {
        closeTrackEditModal();
        return;
      }

      const previousPlaylistIds = Array.isArray(track.playlistIds) ? track.playlistIds.slice() : (track.playlistId ? [track.playlistId] : []);
      const nextPlaylistIds = getSelectedPlaylistIds(elements.trackEditPlaylistSelect);
      const nextTitle = (elements.trackEditTitleInput?.value || '').trim() || track.title || 'Untitled track';
      const nextDescription = elements.trackEditDescriptionInput?.value || '';
      const primaryPlaylistId = nextPlaylistIds[0] || null;

      const client = getSupabaseClient();
      try {
        if (client) {
          const { error } = await client
            .from('video_uploads')
            .update({
              title: nextTitle,
              description: nextDescription || null,
              playlist_id: primaryPlaylistId,
            })
            .eq('id', trackId)
            .eq('owner_id', state.user.id);

          if (error) {
            throw error;
          }
        }

        track.title = nextTitle;
        track.description = nextDescription;
        track.playlistId = primaryPlaylistId || '';
        track.playlistIds = nextPlaylistIds.slice();

        await syncTrackAssignmentToPlaylists(track, previousPlaylistIds, nextPlaylistIds);

        renderMyMusicMenu();
        renderRecentMusic();
        renderFavoriteMenu();
        renderMyPlaylists();
        renderUploadPlaylistOptions();
        renderQueuePlaylistOptions();
        closeTrackEditModal();
        showAppToast('音楽情報を更新しました', 'success');
      } catch (error) {
        logAppError('track edit failed', error);
        showAppToast('音楽情報の更新に失敗しました', 'error');
      }
    });
  }

  document.querySelector('[data-close-visibility-modal="true"]')?.addEventListener('click', closePlaylistVisibilityModal);

  if (elements.prevBtn) {
    elements.prevBtn.addEventListener('click', () => {
      loadTrack(getPreviousIndex(), true);
    });
  }

  if (elements.playPauseBtn) {
    elements.playPauseBtn.addEventListener('click', () => {
      togglePlayback();
      showPlayerControls();
    });
  }

  if (elements.skipForwardBtn) {
    elements.skipForwardBtn.addEventListener('click', () => {
      if (!elements.videoPlayer) {
        return;
      }
      seekBySeconds(10);
    });
  }

  if (elements.skipBackBtn) {
    elements.skipBackBtn.addEventListener('click', () => {
      seekBySeconds(-10);
    });
  }

  if (elements.nextBtn) {
    elements.nextBtn.addEventListener('click', () => {
      loadTrack(getNextIndex(), true);
    });
  }

  elements.modeButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  if (elements.progressBar) {
    elements.progressBar.addEventListener('click', (event) => {
      if (!state.progressDragging) {
        seekToProgressPosition(event.clientX);
        autoplayAfterProgressChange();
        showPlayerControls();
      }
    });

    elements.progressBar.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      state.progressDragging = true;
      elements.progressBar.setPointerCapture?.(event.pointerId);
      seekToProgressPosition(event.clientX);
      autoplayAfterProgressChange();
      showPlayerControls();
    });

    elements.progressBar.addEventListener('pointermove', (event) => {
      if (state.progressDragging) {
        seekToProgressPosition(event.clientX);
        showPlayerControls();
      }
    });

    const stopProgressDrag = (event) => {
      if (!state.progressDragging) {
        return;
      }
      seekToProgressPosition(event.clientX);
      state.progressDragging = false;
      elements.progressBar.releasePointerCapture?.(event.pointerId);
      autoplayAfterProgressChange();
    };

    elements.progressBar.addEventListener('pointerup', stopProgressDrag);
    elements.progressBar.addEventListener('pointercancel', stopProgressDrag);
    elements.progressBar.addEventListener('keydown', (event) => {
      const track = state.queue[state.currentTrackIndex] || state.lastPlayedTrack;
      if (!elements.videoPlayer || !getVideoDuration(elements.videoPlayer, Number(track?.duration) || 0)) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        seekBySeconds(event.key === 'ArrowRight' ? 5 : -5);
        showPlayerControls();
      }
    });
  }

  if (elements.videoPlayer) {
    elements.videoPlayer.addEventListener('contextmenu', (event) => event.preventDefault());
    elements.videoPlayer.addEventListener('dragstart', (event) => event.preventDefault());
    elements.videoPlayer.addEventListener('play', () => {
      updatePlayButton();
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
    });
    elements.videoPlayer.addEventListener('pause', () => {
      updatePlayButton();
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    });
    elements.videoPlayer.addEventListener('play', () => updateCustomPlayerViewport());
    elements.videoPlayer.addEventListener('pause', () => updateCustomPlayerViewport());
    elements.videoPlayer.addEventListener('loadedmetadata', updateProgress);
    elements.videoPlayer.addEventListener('durationchange', updateProgress);
    elements.videoPlayer.addEventListener('loadeddata', updateProgress);
    elements.videoPlayer.addEventListener('canplay', updateProgress);
    elements.videoPlayer.addEventListener('progress', updateProgress);
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

  if (elements.playerViewport) {
    elements.playerViewport.addEventListener('contextmenu', (event) => event.preventDefault());
    elements.playerViewport.addEventListener('dragstart', (event) => event.preventDefault());
  }

  document.addEventListener('keydown', (event) => {
    if (!event.target.closest('.player-viewport')) {
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
    }
  });

  if (elements.expandPlayerBtn) {
    const handleExpandPlayer = (event) => {
      event.preventDefault();
      event.stopPropagation();
      togglePlayerExpanded();
    };
    elements.expandPlayerBtn.addEventListener('click', handleExpandPlayer);
    elements.expandPlayerBtn.addEventListener('touchend', handleExpandPlayer, { passive: false });
  }

  setupMediaSession();

  if (elements.closePlayerBtn) {
    elements.closePlayerBtn.addEventListener('click', closePlayerControls);
  }

  if (elements.playerViewport) {
    elements.playerViewport.addEventListener('mouseenter', showPlayerControls);
    elements.playerViewport.addEventListener('pointermove', showPlayerControls);
    elements.playerViewport.addEventListener('pointerdown', showPlayerControls);
    elements.playerViewport.addEventListener('touchstart', showPlayerControls, { passive: true });
    elements.playerViewport.addEventListener('click', (event) => {
      if (event.target.closest('button, input, .progress-bar')) {
        return;
      }
      togglePlayback();
      showPlayerControls();
    });
  }

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.player-viewport')) {
      hidePlayerControls();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (elements.expandPlayerBtn) {
      const expanded = document.fullscreenElement === elements.playerViewport;
      elements.expandPlayerBtn.innerHTML = `<span aria-hidden="true">${expanded ? '⤡' : '⛶'}</span>`;
      elements.expandPlayerBtn.setAttribute('aria-label', expanded ? '再生画面を縮小' : '再生画面を拡大');
      showPlayerControls();
    }
  });
}

function syncEmptyCloudState() {
  const hasCloudMusic = Array.isArray(state.queue) && state.queue.length > 0;
  const hasTrackLoaded = Boolean(elements.videoPlayer && elements.videoPlayer.currentSrc);
  const featuredCard = document.querySelector('.featured-card');
  const queueCard = document.querySelector('.queue-card');
  const nowPlayingCard = document.querySelector('.now-playing-card');
  const playerPanel = document.querySelector('.player-panel');

  if (featuredCard) {
    featuredCard.classList.toggle('hidden', !hasCloudMusic);
  }

  if (elements.anonymousPreviewBtn) {
    elements.anonymousPreviewBtn.classList.toggle('hidden', !hasCloudMusic || Boolean(state.user));
  }

  if (queueCard) {
    queueCard.classList.toggle('hidden', !hasCloudMusic);
  }

  if (elements.mobileQueueToggleBtn) {
    elements.mobileQueueToggleBtn.classList.toggle('hidden', !hasCloudMusic);
  }

  if (nowPlayingCard) {
    nowPlayingCard.classList.toggle('hidden', !hasCloudMusic);
  }

  if (playerPanel) {
    playerPanel.classList.toggle('hidden', !hasCloudMusic);
  }
}

async function loadCloudUploadsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    state.queue = [];
    state.libraryTracks = [];
    return [];
  }

  const { data, error } = await client
    .from('video_uploads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);

  if (error) {
    logAppError('video uploads load failed', error);
    return Array.isArray(state.libraryTracks) ? state.libraryTracks : [];
  }

  const mapped = (data || []).map((item) => ({
    id: item.id,
    title: item.title || 'Uploaded track',
    artist: item.owner_id === state.user?.id ? (state.user.nickname || 'You') : '匿名アカウント',
    artistIcon: item.owner_id === state.user?.id ? getUserIcon() : '🎧',
    ownerId: item.owner_id || '',
    genre: 'Uploaded',
    src: buildPlayableVideoUrl(item.file_url),
    createdAt: new Date(item.created_at).getTime(),
    publicId: item.public_id,
    thumbnail: buildCloudinaryThumbnailUrl(item.thumbnail_url || item.file_url) || item.thumbnail_url || item.file_url || null,
    description: item.description || '',
    playlistId: item.playlist_id || '',
    isPublic: item.is_public !== false,
    playCount: Number(item.play_count) || 0,
    favoriteCount: Number(item.favorite_count) || 0,
    duration: Number(item.duration) || 0,
  }));

  await hydratePublicTrackAuthors(mapped);
  await hydrateTrackFavorites();

  state.libraryTracks = mapped;
  renderRecentMusic();
  renderMyMusicMenu();
  renderFavoriteMenu();
  syncEmptyCloudState();
  return mapped;
}

async function hydrateTrackFavorites() {
  state.trackFavorites = [];
  if (!state.user?.id) {
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  const { data, error } = await client
    .from('track_favorites')
    .select('track_id')
    .eq('user_id', state.user.id);
  if (!error) {
    state.trackFavorites = (data || []).map((row) => row.track_id);
  } else {
    logAppError('track favorites load failed', error);
  }
}

async function hydratePublicTrackAuthors(tracks) {
  const client = getSupabaseClient();
  const ownerIds = [...new Set(tracks.map((track) => track.ownerId).filter(Boolean))];
  if (!client || !ownerIds.length) {
    return;
  }

  const { data, error } = await client
    .from('profiles')
    .select('id, nickname, icon')
    .in('id', ownerIds);
  if (error) {
    logAppError('public track authors load failed', error);
    return;
  }

  const profiles = new Map((data || []).map((profile) => [profile.id, profile]));
  tracks.forEach((track) => {
    const profile = profiles.get(track.ownerId);
    if (!profile) {
      return;
    }
    track.artist = profile.nickname || track.artist || '匿名アカウント';
    track.artistIcon = profile.icon || track.artistIcon || '🎧';
  });
}

async function hydrateTrackAuthor(track) {
  const client = getSupabaseClient();
  if (!client || !track?.ownerId) {
    return false;
  }

  const { data, error } = await client
    .from('profiles')
    .select('nickname, icon')
    .eq('id', track.ownerId)
    .single();
  if (error || !data) {
    return false;
  }

  track.artist = data.nickname || track.artist || '匿名アカウント';
  track.artistIcon = data.icon || track.artistIcon || '🎧';
  return true;
}

async function saveUploadedTrackToSupabase(fileUrl, publicId, title, thumbnail, description = '', playlistIds = [], duration = 0) {
  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    throw new Error('User not authenticated');
  }

  const normalizedPlaylistIds = Array.isArray(playlistIds)
    ? playlistIds.filter((playlistId) => playlistId && playlistId !== 'favorite-songs')
    : (playlistIds && playlistIds !== 'favorite-songs' ? [playlistIds] : []);
  const safePlaylistId = normalizedPlaylistIds[0] || null;

  const payload = {
    owner_id: state.user.id,
    title,
    file_url: fileUrl,
    public_id: publicId,
    thumbnail_url: thumbnail || null,
    description: description || null,
    duration: Number(duration) || 0,
    playlist_id: safePlaylistId,
    is_public: true,
  };
  let { error } = await client.from('video_uploads').insert(payload);

  if (error?.code === '42703') {
    delete payload.duration;
    ({ error } = await client.from('video_uploads').insert(payload));
  }

  if (error) {
    throw error;
  }
}

async function addUploadedTrackToPlaylist(track, playlistIdOrIds) {
  const playlistIds = Array.isArray(playlistIdOrIds)
    ? playlistIdOrIds.filter((id) => id && id !== 'favorite-songs')
    : (playlistIdOrIds && playlistIdOrIds !== 'favorite-songs' ? [playlistIdOrIds] : []);

  if (!track || !playlistIds.length) {
    return;
  }

  const client = getSupabaseClient();

  for (const playlistId of playlistIds) {
    if (playlistId === 'favorite-songs') {
      const targetTrack = state.libraryTracks.find((item) => item.id === track.id || item.src === track.src);
      if (!state.trackFavorites.includes(track.id)) {
        await toggleTrackFavorite(targetTrack || track);
      }
      renderFavoriteSongs();
      renderMyPlaylists();
      continue;
    }

    const playlist = state.playlists.find((item) => item.id === playlistId);
    if (playlist) {
      playlist.items = Array.isArray(playlist.items) ? playlist.items : [];
      const exists = playlist.items.some((item) => `${item.id || ''}|${item.src || ''}` === `${track.id || ''}|${track.src || ''}`);
      if (!exists) {
        playlist.items.push({ ...track });
      }
    }

    if (!client || !state.user?.id || String(playlistId).startsWith('playlist-')) {
      continue;
    }

    const { error } = await client.from('playlist_items').insert({
      playlist_id: playlistId,
      title: track.title,
      artist: track.artist,
      genre: track.genre,
      src: track.src,
      order_index: Array.isArray(playlist?.items) ? playlist.items.length : 0,
    });

    if (error) {
      logAppError('uploaded track playlist save failed', error);
    }
  }
}

async function compressVideoForCloudinary(file, onProgress) {
  if (!file.type.startsWith('video/')) {
    throw new Error('100MBを超える音声ファイルはCloudinaryの上限を超えるためアップロードできません。');
  }

  if (typeof MediaRecorder === 'undefined') {
    throw new Error('このブラウザは大きな動画の圧縮に対応していません。ChromeまたはEdgeでお試しください。');
  }

  const video = document.createElement('video');
  const objectUrl = URL.createObjectURL(file);
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.src = objectUrl;

  try {
    await new Promise((resolve, reject) => {
      video.addEventListener('loadedmetadata', resolve, { once: true });
      video.addEventListener('error', () => reject(new Error('動画を圧縮するために読み込めませんでした。')), { once: true });
    });

    const sourceStream = typeof video.captureStream === 'function' ? video.captureStream() : null;
    if (!sourceStream) {
      throw new Error('このブラウザは動画の圧縮に対応していません。ChromeまたはEdgeでお試しください。');
    }

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
    const targetBytes = 90 * 1024 * 1024;
    const targetBitrate = Math.floor((targetBytes * 8 * 0.9) / duration);
    const audioBitrate = 96_000;
    const videoBitrate = Math.max(600_000, Math.min(3_500_000, targetBitrate - audioBitrate));
    const mimeType = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ].find((type) => MediaRecorder.isTypeSupported(type));

    if (!mimeType) {
      throw new Error('このブラウザで利用できる動画圧縮形式がありません。ChromeまたはEdgeでお試しください。');
    }

    const recorder = new MediaRecorder(sourceStream, {
      mimeType,
      videoBitsPerSecond: videoBitrate,
      audioBitsPerSecond: audioBitrate,
    });
    const chunks = [];
    const recordingFinished = new Promise((resolve, reject) => {
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size) {
          chunks.push(event.data);
        }
      });
      recorder.addEventListener('stop', resolve, { once: true });
      recorder.addEventListener('error', () => reject(new Error('動画の圧縮に失敗しました。')), { once: true });
    });

    video.addEventListener('timeupdate', () => {
      const progress = Math.round((video.currentTime / duration) * 100);
      onProgress?.(Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0)));
    });
    video.addEventListener('ended', () => recorder.state !== 'inactive' && recorder.stop(), { once: true });
    recorder.start(1000);
    await video.play();
    await recordingFinished;

    const compressedBlob = new Blob(chunks, { type: mimeType });
    const compressedName = `${file.name.replace(/\.[^/.]+$/, '') || 'video'}.webm`;
    return new File([compressedBlob], compressedName, { type: mimeType });
  } finally {
    video.pause();
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(objectUrl);
  }
}

async function getVideoFileDuration(file) {
  if (!file?.type?.startsWith('video/')) {
    return 0;
  }

  const video = document.createElement('video');
  const objectUrl = URL.createObjectURL(file);
  video.preload = 'metadata';
  video.src = objectUrl;

  try {
    await new Promise((resolve, reject) => {
      video.addEventListener('loadedmetadata', resolve, { once: true });
      video.addEventListener('error', () => reject(new Error('動画の再生時間を取得できませんでした。')), { once: true });
    });
    return Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
  } finally {
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(objectUrl);
  }
}

async function uploadCloudinaryFile(file, cloudName, uploadPreset, onProgress) {
  const directUploadLimit = 10 * 1024 * 1024;
  const chunkSize = 20 * 1024 * 1024;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const parseUploadResponse = async (response, fileName) => {
    const responseText = await response.text();
    let payload = {};
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      throw new Error(`Cloudinaryの応答を読み取れませんでした: ${fileName}`);
    }

    if (!response.ok || payload.error) {
      throw new Error(payload?.error?.message || `Cloudinary upload failed: ${fileName}`);
    }

    return payload;
  };

  if (file.size <= directUploadLimit) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'music-share');
    formData.append('resource_type', 'video');
    const response = await fetch(uploadUrl, { method: 'POST', body: formData });
    return parseUploadResponse(response, file.name);
  }

  const chunkedUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  const uploadId = typeof globalThis.crypto?.randomUUID === 'function'
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let payload = null;

  for (let start = 0; start < file.size; start += chunkSize) {
    const end = Math.min(start + chunkSize, file.size) - 1;
    const formData = new FormData();
    formData.append('file', file.slice(start, end + 1), file.name);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'music-share');

    const response = await fetch(chunkedUploadUrl, {
      method: 'POST',
      headers: {
        'X-Unique-Upload-Id': uploadId,
        'Content-Range': `bytes ${start}-${end}/${file.size}`,
      },
      body: formData,
    });

    payload = await parseUploadResponse(response, file.name);
    onProgress?.(Math.round(((end + 1) / file.size) * 100));
  }

  if (!payload?.secure_url && !payload?.url) {
    throw new Error(`Cloudinaryの動画アップロードが完了しませんでした: ${file.name}`);
  }

  return payload;
}

async function uploadVideoFilesToCloudinary(files, metadata = {}) {
  if (!Array.isArray(files) || !files.length) {
    return [];
  }

  const cloudName = appConfig.cloudinary?.cloudName;
  const uploadPreset = appConfig.cloudinary?.uploadPreset;

  if (!cloudName || cloudName.includes('YOUR_') || !uploadPreset || uploadPreset.includes('YOUR_')) {
    throw new Error('Cloudinary の設定が未完了です。config.js の cloudName と uploadPreset を確認してください。');
  }

  const uploaded = [];
  const selectedTitle = String(metadata.title || '').trim();
  const description = String(metadata.description || '').trim();
  const playlistIds = Array.isArray(metadata.playlistIds)
    ? metadata.playlistIds.filter((value) => value && value !== '')
    : (metadata.playlistId ? [String(metadata.playlistId).trim()] : []).filter(Boolean);

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    let uploadFile = file;
    const sourceDuration = await getVideoFileDuration(file).catch(() => 0);
    const progressPercent = Math.round(((index + 1) / files.length) * 100);

    setUploadStatus(`安全なクラウドに保存中... ${index + 1}/${files.length} (${Math.max(10, progressPercent - 20)}%)`, {
      uploading: true,
      percent: Math.max(10, progressPercent - 20),
    });

    if (file.size > 100 * 1024 * 1024) {
      setUploadStatus(`動画を圧縮中... ${index + 1}/${files.length} (0%)`, {
        uploading: true,
        percent: 5,
      });
      uploadFile = await compressVideoForCloudinary(file, (compressionPercent) => {
        setUploadStatus(`動画を圧縮中... ${index + 1}/${files.length} (${compressionPercent}%)`, {
          uploading: true,
          percent: Math.max(5, Math.round(compressionPercent * 0.2)),
        });
      });

      if (uploadFile.size > 100 * 1024 * 1024) {
        throw new Error(`圧縮後もファイルが100MBを超えています: ${file.name}`);
      }
    }

    const payload = await uploadCloudinaryFile(uploadFile, cloudName, uploadPreset, (filePercent) => {
      const safeFilePercent = Number.isFinite(filePercent) ? Math.min(100, Math.max(0, filePercent)) : 0;
      const overallPercent = Math.round(((index + safeFilePercent / 100) / files.length) * 100);
      setUploadStatus(`安全なクラウドに保存中... ${index + 1}/${files.length} (${Math.max(10, overallPercent - 20)}%)`, {
        uploading: true,
        percent: Math.max(10, overallPercent - 20),
      });
    });

    const fileTitle = file.name.replace(/\.[^/.]+$/, '') || 'Uploaded track';
    const title = selectedTitle || fileTitle;
    const fileUrl = buildPlayableVideoUrl(payload.eager?.[0]?.secure_url || payload.eager?.[0]?.url || payload.secure_url || payload.url);
    const thumbnailUrl = buildCloudinaryThumbnailUrl(payload.thumbnail_url || payload.eager?.[0]?.secure_url || payload.secure_url || payload.url);

    setUploadStatus(`保存処理を待っています... ${index + 1}/${files.length}`, {
      uploading: true,
      percent: Math.min(80, 60 + index * 10),
    });

    const localTrack = {
      id: payload.public_id || `${Date.now()}-${Math.random()}`,
      title,
      artist: state.user?.nickname || 'You',
      artistIcon: getUserIcon(),
      ownerId: state.user?.id || '',
      genre: 'Uploaded',
      src: fileUrl,
      createdAt: Date.now(),
      publicId: payload.public_id || '',
      thumbnail: thumbnailUrl || null,
      duration: Number(payload.duration) || sourceDuration,
        description,
    };

    try {
      await saveUploadedTrackToSupabase(fileUrl, payload.public_id || '', title, thumbnailUrl, description, playlistIds, Number(payload.duration) || sourceDuration);
    } catch (error) {
      logAppError('Supabase upload record save failed', error);
    }

    try {
      await addUploadedTrackToPlaylist(localTrack, playlistIds);
    } catch (error) {
      logAppError('uploaded track playlist save failed', error);
    }

    uploaded.push(localTrack);
  }

  setUploadStatus('反映を待っています...', { uploading: true, percent: 90 });
  return uploaded;
}

async function loadSharedPlaylistById(playlistId) {
  const client = getSupabaseClient();
  if (!client || !playlistId) {
    return null;
  }

  const { data, error } = await client
    .from('playlists')
    .select('id, name, description, icon, is_public, created_at, owner_id, playlist_items(*)')
    .eq('id', playlistId)
    .maybeSingle();

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      logAppError('shared playlist load failed', error);
    }
    return null;
  }

  const mapped = {
    id: data.id,
    name: data.name,
    icon: data.icon || '♫',
    description: data.description || '',
    items: (data.playlist_items || []).map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artist || 'Family',
      genre: item.genre || 'Music',
      src: item.src,
      description: item.description || '',
    })),
    isPublic: Boolean(data.is_public),
    ownerId: data.owner_id || '',
    ownerName: data.owner_id === state.user?.id ? getUserNickname() : '匿名アカウント',
    ownerIcon: data.owner_id === state.user?.id ? getUserIcon() : '🎧',
    createdAt: new Date(data.created_at).getTime(),
  };

  const existingIndex = state.playlists.findIndex((playlist) => playlist.id === mapped.id);
  if (existingIndex >= 0) {
    state.playlists[existingIndex] = { ...state.playlists[existingIndex], ...mapped };
  } else {
    state.playlists.unshift(mapped);
  }

  renderMyPlaylists();
  renderUploadPlaylistOptions();
  renderFavoritePlaylists();

  return mapped;
}

async function applySharedPlaylistFromUrl() {
  const playlistId = new URLSearchParams(window.location.search).get('playlist');
  if (!playlistId) {
    state.pendingSharedPlaylistId = null;
    return;
  }

  state.pendingSharedPlaylistId = playlistId;

  let targetPlaylist = state.playlists.find((playlist) => playlist.id === playlistId);
  if (!targetPlaylist) {
    targetPlaylist = await loadSharedPlaylistById(playlistId);
  }

  if (!targetPlaylist) {
    return;
  }

  if (!targetPlaylist.isPublic && targetPlaylist.ownerId !== state.user?.id) {
    showAppToast('現在このプレイリストは非公開です', 'info');
    state.pendingSharedPlaylistId = null;
    return;
  }

  state.currentPlaylistId = targetPlaylist.id;
  state.lastPlayedTrack = null;
  addPlaylistToQueue(targetPlaylist.id);
  state.pendingSharedPlaylistId = null;
}

async function initializeApp() {
  loadStateFromLocal();
  ensureSeedPlaylists();
  bindEvents();
  bindProfileIconOptions();
  renderRecentMusic();
  renderQueue();
  renderFavoritePlaylists();
  renderMyPlaylists();
  renderMyMusicMenu();
  renderFavoriteMenu();
  restoreActiveScreen();
  updatePlayerMeta();
  updateAuthUI();
  state.pendingSharedPlaylistId = new URLSearchParams(window.location.search).get('playlist') || null;
  await initializeSupabaseSession();
  await applySharedPlaylistFromUrl();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  }, { once: true });
} else {
  initializeApp();
}

function loginAsMockUser() {
  const fallbackIcon = PROFILE_ICONS[Math.floor(Math.random() * PROFILE_ICONS.length)];
  const nickname = generateRandomNickname();
  const mockUser = {
    id: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email: 'guest@local.test',
    nickname,
    name: nickname,
    details: '',
    icon: fallbackIcon,
    profile: {
      nickname,
      details: '',
      icon: fallbackIcon,
    },
  };

  applyUserProfile(mockUser);
  state.authLoading = false;
  saveLocalState();
  updateAuthUI();
  closeAuthModal();
  closeProfileModal();

  void loadSupabasePlaylists();
  void loadCloudUploadsFromSupabase();
}

async function logoutUser() {
  const client = getSupabaseClient();
  if (client && client.auth && typeof client.auth.signOut === 'function') {
    try {
      await client.auth.signOut();
    } catch (error) {
      logAppError('Supabase sign out failed', error);
    }
  }

  if (state.videoUploadsChannel && client) {
    client.removeChannel(state.videoUploadsChannel);
    state.videoUploadsChannel = null;
  }

  state.user = null;
  state.favorites = [];
  state.trackFavorites = [];
  state.authLoading = false;

  if (elements.queuePlaylistModalList) setSelectedPlaylistIds(elements.queuePlaylistModalList, []);
  if (elements.queueModalAddMode) elements.queueModalAddMode.value = 'current';
  if (elements.uploadPlaylistSearch) elements.uploadPlaylistSearch.value = '';
  if (elements.uploadPlaylistSelect) setSelectedPlaylistIds(elements.uploadPlaylistSelect, []);
  if (elements.uploadPlaylistSort) elements.uploadPlaylistSort.value = 'created-desc';

  renderUploadPlaylistOptions();
  renderQueuePlaylistOptions();
  closeQueuePlaylistModal();
  renderFavoritePlaylists();
  renderMyPlaylists();
  renderMyMusicMenu();
  renderFavoriteMenu();
  renderRecentPlaylists();
  renderPopularPlaylists();
  void loadSupabasePlaylists();

  saveLocalState();
  updateAuthUI();
  closeAuthModal();
  closeProfileModal();
}

function setUploadStatus(message, { uploading = false, percent = null } = {}) {
  if (!elements.uploadStatus) {
    return;
  }

  state.uploading = uploading;
  state.uploadMessage = message;
  if (percent !== null) {
    state.uploadProgress = percent;
  }

  elements.uploadStatus.textContent = message;
  elements.uploadStatus.classList.toggle('hidden', !message);
  elements.uploadStatus.classList.toggle('is-busy', uploading);

  if (elements.videoUploadInput) {
    elements.videoUploadInput.disabled = uploading || !state.user;
    elements.videoUploadInput.parentElement?.classList.toggle('disabled', uploading || !state.user);
  }
  if (elements.uploadSubmitBtn) {
    elements.uploadSubmitBtn.disabled = uploading || !state.user || !state.pendingUploadFiles.length;
  }
}

function showAppToast(message, type = 'info', { duration = 3200 } = {}) {
  if (!elements.appToast) {
    return;
  }

  if (state.toastTimer) {
    window.clearTimeout(state.toastTimer);
  }

  elements.appToast.textContent = message;
  elements.appToast.className = `app-toast is-visible is-${type}`;
  if (duration > 0) {
    state.toastTimer = window.setTimeout(() => {
      elements.appToast.classList.remove('is-visible');
      state.toastTimer = null;
    }, duration);
  } else {
    state.toastTimer = null;
  }
}

function clearUploadForm() {
  if (elements.videoUploadInput) elements.videoUploadInput.value = '';
  if (elements.uploadTitleInput) elements.uploadTitleInput.value = '';
  if (elements.uploadDescriptionInput) elements.uploadDescriptionInput.value = '';
  if (elements.uploadPlaylistSearch) elements.uploadPlaylistSearch.value = '';
  if (elements.uploadPlaylistSelect) elements.uploadPlaylistSelect.value = '';
  if (elements.uploadPlaylistSort) elements.uploadPlaylistSort.value = 'created-desc';
  elements.uploadMetadata?.classList.add('hidden');
  renderUploadPlaylistOptions();
}

function renderQueue() {
  const queueList = document.querySelector('.queue-list');
  if (!queueList) {
    return;
  }

  const tracks = Array.isArray(state.queue) ? state.queue : [];

  if (!tracks.length) {
    queueList.innerHTML = '<div class="queue-item empty"><span>再生予定の曲はありません</span></div>';
    return;
  }

  queueList.innerHTML = tracks
    .map((track, index) => {
      const thumbnailStyle = track.thumbnail
        ? `style="background-image: url('${track.thumbnail}'); background-size: cover; background-position: center; background-repeat: no-repeat;"`
        : '';
      return `
        <button class="queue-item ${index === state.currentTrackIndex ? 'is-current' : ''}" type="button" data-queue-index="${index}" aria-label="${track.title}を再生">
          <span class="queue-number">${String(index + 1).padStart(2, '0')}</span>
          ${track.thumbnail ? `<div class="queue-thumbnail" ${thumbnailStyle}></div>` : ''}
          <span class="queue-title">${track.title}</span>
        </button>
      `;
    })
    .join('');

  queueList.querySelectorAll('[data-queue-index]').forEach((item) => {
    item.addEventListener('click', () => {
      loadTrack(Number(item.dataset.queueIndex), true);
    });
  });

  const currentQueueItem = queueList.querySelector('.queue-item.is-current');
  if (currentQueueItem && queueList.scrollHeight > queueList.clientHeight) {
    const targetScrollTop = currentQueueItem.offsetTop - (queueList.clientHeight - currentQueueItem.offsetHeight) / 2;
    queueList.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    });
  }
}

function clearQueue() {
  state.queue = [];
  state.currentTrackIndex = 0;

  if (elements.videoPlayer) {
    elements.videoPlayer.pause();
    elements.videoPlayer.removeAttribute('src');
    elements.videoPlayer.load();
  }

  updatePlayerMeta(null);
  updateCustomPlayerViewport(null);
  renderQueue();
  syncEmptyCloudState();
  showAppToast('キューをクリアしました', 'success');
}

// Supabase setup is handled in initializeSupabaseSession();

function subscribeToVideoUploads() {
  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  if (state.videoUploadsChannel) {
    client.removeChannel(state.videoUploadsChannel);
    state.videoUploadsChannel = null;
  }

  const channel = client.channel('video_uploads_live');
  state.videoUploadsChannel = channel;

  channel
    .on('postgres_changes', { event: '*', schema: 'public', table: 'video_uploads' }, async () => {
      await loadCloudUploadsFromSupabase();
      renderRecentMusic();
      renderQueue();
      syncEmptyCloudState();

      if (state.queue.length && !elements.videoPlayer?.currentSrc) {
        loadTrack(0, false);
      }
    })
    .subscribe();
}

function normalizeTrackSnapshot(track) {
  if (!track || typeof track !== 'object') {
    return null;
  }

  const src = buildPlayableVideoUrl(track.src || track.file_url || '');
  const title = (track.title || track.name || 'Untitled track').trim() || 'Untitled track';
  const artist = track.artist || '匿名アカウント';
  const artistIcon = track.artistIcon || track.artist_icon || '🎧';
  const genre = track.genre || 'Uploaded';
  const createdAt = track.createdAt || track.created_at || new Date().toISOString();
  const thumbnail = buildCloudinaryThumbnailUrl(track.thumbnail || track.thumbnail_url || track.file_url || track.src) || track.thumbnail || track.thumbnail_url || null;

  return {
    id: track.id || track.publicId || `${title}-${src}`,
    title,
    artist,
    artistIcon,
    ownerId: track.ownerId || track.owner_id || '',
    genre,
    src,
    createdAt,
    publicId: track.publicId || track.public_id || '',
    thumbnail,
    description: String(track.description || track.details || '').trim(),
    playCount: Number(track.playCount || track.play_count) || 0,
    favoriteCount: Number(track.favoriteCount || track.favorite_count) || 0,
    duration: Number(track.duration) || 0,
  };
}

function updatePlayerIdleState() {
  const playerPanel = document.querySelector('.player-panel');
  if (!playerPanel) {
    return;
  }

  const hasTrackLoaded = Boolean(elements.videoPlayer && elements.videoPlayer.currentSrc);
  const isIdle = !hasTrackLoaded;

  playerPanel.classList.toggle('is-idle', isIdle);
  playerPanel.classList.toggle('is-playing', hasTrackLoaded);
}

async function saveLastPlayedTrackToSupabase(track) {
  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    return false;
  }

  const snapshot = normalizeTrackSnapshot(track || state.queue[state.currentTrackIndex] || state.lastPlayedTrack);
  if (!snapshot || !snapshot.src) {
    return false;
  }

  const payload = {
    id: state.user.id,
    email: state.user.email || 'user@example.com',
    last_played_track: snapshot,
    updated_at: new Date().toISOString(),
  };

  const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
  if (error) {
    logAppError('last played track save failed', error);
    return false;
  }

  state.lastPlayedTrack = snapshot;
  return true;
}

async function recordTrackPlay(track) {
  const client = getSupabaseClient();
  if (!client || !state.user?.id || !track) {
    return false;
  }

  const libraryTrack = state.libraryTracks.find((item) => (
    item.id === track.id || item.src === track.src || item.publicId === track.publicId
  ));
  const trackId = libraryTrack?.id;
  if (!trackId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(trackId))) {
    return false;
  }

  const { error } = await client.rpc('record_track_play', { track_uuid: trackId });
  if (error) {
    logAppError('track play record failed', error);
    return false;
  }

  return true;
}

function hasSharedPlaylistQuery() {
  return Boolean(new URLSearchParams(window.location.search).get('playlist'));
}

async function hydrateLastPlayedTrackFromSupabase() {
  if (state.pendingSharedPlaylistId || hasSharedPlaylistQuery()) {
    return null;
  }

  const client = getSupabaseClient();
  if (!client || !state.user?.id) {
    return null;
  }

  const { data, error } = await client.from('profiles').select('last_played_track').eq('id', state.user.id).single();
  if (error && error.code !== 'PGRST116') {
    logAppError('last played track load failed', error);
    return null;
  }

  const snapshot = data?.last_played_track ? normalizeTrackSnapshot(data.last_played_track) : null;
  if (!snapshot) {
    state.lastPlayedTrack = null;
    return null;
  }

  state.lastPlayedTrack = snapshot;

  const matchedTrack = state.libraryTracks.find((track) => {
    const candidate = normalizeTrackSnapshot(track);
    return candidate && (
      candidate.src === snapshot.src ||
      candidate.id === snapshot.id ||
      candidate.publicId === snapshot.publicId ||
      (candidate.title === snapshot.title && candidate.artist === snapshot.artist)
    );
  });

  state.queue = [matchedTrack || snapshot];
  state.currentTrackIndex = 0;
  loadTrack(0, false);

  renderQueue();
  return snapshot;
}

function updatePlayerMeta(track) {
  const activeTrack = track || state.queue[state.currentTrackIndex] || null;
  const hasTrackLoaded = Boolean(elements.videoPlayer && elements.videoPlayer.currentSrc);
  const hasTrack = Boolean(activeTrack);
  const coverImage = activeTrack?.thumbnail || activeTrack?.thumbnail_url || '';

  if (elements.playerTitle) {
    elements.playerTitle.textContent = hasTrack ? activeTrack.title : '';
  }
  if (elements.playerArtist) {
    elements.playerArtist.textContent = hasTrack ? `${activeTrack.artistIcon || '🎧'} ${activeTrack.artist || '匿名アカウント'}` : '';
  }
  if (elements.playerDate) {
    if (!hasTrack) {
      elements.playerDate.textContent = '';
    } else {
      const timestamp = activeTrack.createdAt || activeTrack.created_at || new Date().toISOString();
      elements.playerDate.textContent = formatDateLabel(timestamp);
    }
  }

  if (elements.playerFavoriteBtn) {
    const isFavorite = Boolean(activeTrack && state.trackFavorites.includes(activeTrack.id));
    elements.playerFavoriteBtn.textContent = isFavorite ? '☆お気に入り曲から解除' : '★お気に入り曲に追加';
    elements.playerFavoriteBtn.classList.toggle('is-favorite', isFavorite);
    elements.playerFavoriteBtn.disabled = !activeTrack;
  }

  const description = String(activeTrack?.description || '').trim();
  if (elements.playerDescriptionText) {
    elements.playerDescriptionText.textContent = description || '説明はありません';
    elements.playerDescriptionText.classList.remove('is-expanded');
  }
  if (elements.playerDescriptionToggle) {
    const lineHeight = Number.parseFloat(window.getComputedStyle(elements.playerDescriptionText).lineHeight) || 0;
    const hasMultipleLines = Boolean(description) && elements.playerDescriptionText.scrollHeight > lineHeight * 1.5;
    elements.playerDescriptionToggle.classList.toggle('hidden', !hasMultipleLines);
    elements.playerDescriptionToggle.classList.remove('is-expanded');
    elements.playerDescriptionToggle.textContent = 'すべて見る';
    elements.playerDescriptionToggle.setAttribute('aria-expanded', 'false');
  }

  const cover = document.querySelector('.player-cover');
  if (cover) {
    const hasCoverImage = Boolean(activeTrack && coverImage);

    cover.style.opacity = hasTrack && (hasCoverImage || hasTrackLoaded) ? '1' : '0';
    cover.style.visibility = hasTrack && (hasCoverImage || hasTrackLoaded) ? 'visible' : 'hidden';
    cover.style.backgroundImage = hasCoverImage ? `url('${coverImage}')` : '';
    cover.style.backgroundSize = hasCoverImage ? 'cover' : '';
    cover.style.backgroundPosition = hasCoverImage ? 'center' : '';
    cover.style.backgroundRepeat = hasCoverImage ? 'no-repeat' : '';
    cover.textContent = hasCoverImage ? '' : '♪';
  }

  updatePlayerIdleState();
}
