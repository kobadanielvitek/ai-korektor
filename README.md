# AI Korektor (lokální)

Aplikace pro opravu textu (pravopis, gramatika, interpunkce) pomocí lokálního AI modelu přes Ollama.
Žádná data neopouští váš počítač.

## Požadavky
- Nainstalovaný [Ollama](https://ollama.com) (již máte: qwen2.5:7b, qwen2.5-coder:7b)
- Node.js (již máte)

## Spuštění
1. Ujistěte se, že běží Ollama: `ollama serve` (nebo aplikace Ollama v pozadí).
   - Na vašem PC Ollama používá GPU, která hlásí chybu CUDA. Doporučeno spustit s CPU:
     `set OLLAMA_NUM_GPU=0` a pak `ollama serve`
2. Spusťte `start.bat` (nebo `node server.js`).
3. Otevře se prohlížeč na http://127.0.0.1:3000

## Poznámka k výkonu
Model běží na CPU (num_gpu=0), proto může být odpověď pomalejší (cca 10–30 s). Můžete zkusit vypnout "Vynutit CPU", pokud vaše GPU funguje.

## Alternativní existující aplikace
- LanguageTool (desktop/web, čeština) — https://languagetool.org
- Grammarly (angličtina)
- DeepL Write
- LibreOffice Writer (kontrola pravopisu)
- VSCodium/VS Code rozšíření "LTeX" / "Code Spell Checker"
