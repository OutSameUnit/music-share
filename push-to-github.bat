@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

echo === GitHub push helper ===

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo This folder is not a Git repository.
    pause
    exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if not defined BRANCH (
    echo Could not determine the current branch.
    pause
    exit /b 1
)

for /f "delims=" %%R in ('git remote get-url origin 2^>nul') do set "REMOTE=%%R"
if not defined REMOTE (
    echo Remote "origin" is not configured.
    pause
    exit /b 1
)

echo Repository: %REMOTE%
echo Branch: %BRANCH%
echo.
git status --short

git status --porcelain | findstr . >nul
if errorlevel 1 (
    echo No changes to commit.
    pause
    exit /b 0
)

echo.
set /p "MESSAGE=Commit message (default: Update app): "
if not defined MESSAGE set "MESSAGE=Update app"

echo.
echo Staging changes...
git add -A
if errorlevel 1 goto :failed

echo Committing...
git commit -m "%MESSAGE%"
if errorlevel 1 goto :failed

echo Pushing to origin/%BRANCH%...
git push origin "%BRANCH%"
if errorlevel 1 (
    echo.
    echo Push failed. The remote branch may have commits that are not local.
    echo Run "git pull --rebase origin %BRANCH%" and resolve any conflicts, then run this script again.
    pause
    exit /b 1
)

echo.
echo Push completed successfully.
git status --short --branch
pause
exit /b 0

:failed
echo.
echo Git command failed. No further action was taken.
pause
exit /b 1
