@echo off
cd /d "%~dp0"
echo Spoustim AI Korektor...
start "" "http://127.0.0.1:3000"
node server.js
pause