/**
 * grug-group420 Portal
 * grugbot420 Playground
 * 
 * Supports:
 * - Standalone mode (embedded grugbot)
 * - Server mode (connects to local Bun server via /api/cmd)
 */

// ===== Server Connection =====
const API_BASE = window.location.origin;
let serverMode = false;

// Check if running on local server
async function checkServer() {
    try {
        const res = await fetch(`${API_BASE}/api/health`, { 
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.status === 'ok' && data.bot === 'grugbot420') {
                serverMode = true;
                console.log('🔗 Connected to grugbot420 server v' + data.version);
                updateServerStatus(true, data.version);
                return true;
            }
        }
    } catch (e) {
        // Server not available, use embedded mode
    }
    serverMode = false;
    console.log('📦 Running in standalone mode (embedded grugbot420)');
    updateServerStatus(false);
    return false;
}

// Update UI to show connection status
function updateServerStatus(connected, version) {
    const header = document.querySelector('.output-header span:last-of-type');
    if (header && !header.classList.contains('clear-btn')) {
        const indicator = connected ? '🟢' : '🟡';
        const mode = connected ? `server v${version}` : 'standalone';
        header.textContent = `grugbot420 ${mode} ${indicator}`;
    }
}

// Send command to server
async function serverCommand(cmd) {
    try {
        const res = await fetch(`${API_BASE}/api/cmd`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cmd })
        });
        if (res.ok) {
            const data = await res.json();
            return data.result;
        }
    } catch (e) {
        console.error('Server error, falling back to embedded:', e);
        serverMode = false;
        updateServerStatus(false);
    }
    return null;
}

// ===== grugbot420 Embedded Core =====
const grugbot = {
    version: '4.2.0',
    mood: 'ready to ship',
    
    commands: {
        help: {
            desc: 'Show commands',
            run: () => `🤖 grugbot420 Commands:

  help        Show this help
  wisdom      Get grug wisdom
  ship        Ship some code
  think       What grug think?
  debug       Debug like grug
  complexity  Check complexity
  joke        Tell grug joke
  stack       Show tech stack
  coffee      Coffee status
  manifesto   The grug way
  about       About grugbot420
  clear       Clear output

Type command and press Enter!`
        },
        
        wisdom: {
            desc: 'Grug wisdom',
            run: () => {
                const w = [
                    "🦴 \"Complexity very very bad. Simple good.\"",
                    "🦴 \"Say no to complexity. Say yes to ship.\"",
                    "🦴 \"Best code is no code. Second best is simple code.\"",
                    "🦴 \"Clever code is enemy. Future grug not understand.\"",
                    "🦴 \"Type system good. Help grug catch bug.\"",
                    "🦴 \"Test good, but simple code better than many test.\"",
                    "🦴 \"Copy paste not always bad. Abstraction can be worse.\"",
                    "🦴 \"Senior grug mass delete code. Junior grug add code.\"",
                    "🦴 \"When bug appear, first ask: is this too complex?\"",
                    "🦴 \"Premature optimization root of mass diff evil.\"",
                    "🦴 \"Refactor when pain, not when bored.\"",
                    "🦴 \"Naming hard. But good name worth many comment.\"",
                    "🦴 \"If function need many argument, maybe do too much.\"",
                    "🦴 \"Grug not mass diff. Grug small diff many time.\""
                ];
                return w[Math.floor(Math.random() * w.length)];
            }
        },
        
        ship: {
            desc: 'Ship code',
            run: () => {
                const m = [
                    "🚀 SHIPPED! Code in production. Grug happy.",
                    "🚀 Deploy complete. Time for club sandwich.",
                    "🚀 git push origin main... Success!",
                    "🚀 Ship now, fix later. This is the way.",
                    "🚀 Code shipped! Zero downtime. Grug proud.",
                    "🚀 Pipeline green. Production updated. Grug rest.",
                    "🚀 Deployed! Users already using. Ship fast win."
                ];
                return m[Math.floor(Math.random() * m.length)];
            }
        },
        
        think: {
            desc: 'Grug thoughts',
            run: () => {
                const t = [
                    "🧠 *grug brain processing*\n\n...no wait, grug no think. Grug DO.",
                    "🧠 Grug think about simple solution.\n\nAnswer: delete code.",
                    "🧠 Grug ponder existence...\n\nConclusion: ship or no ship. Only question.",
                    "🧠 Brain hurt from complexity.\n\nMust simplify. Must ship.",
                    "🧠 Grug think:\n\nif (works) { ship(); } else { console.log('here'); }",
                    "🧠 Deep thought...\n\n\"Maybe we no need microservices. Maybe monolith fine.\""
                ];
                return t[Math.floor(Math.random() * t.length)];
            }
        },
        
        debug: {
            desc: 'Debug protocol',
            run: () => `🔍 Grug Debug Protocol™ v4.20:

Step 1: console.log("here 1")
Step 2: console.log("here 2") 
Step 3: console.log("why this no work")
Step 4: console.log(JSON.stringify(thing, null, 2))
Step 5: Take break. Drink water.
Step 6: Re-read error message (actually read this time)
Step 7: Find typo in variable name
Step 8: Fixed! Ship it! 🚀

Debugging time: 2 hours
Time to find bug: 30 seconds
Time staring at screen: 1 hour 29 minutes 30 seconds`
        },
        
        complexity: {
            desc: 'Check complexity',
            run: () => {
                const level = Math.floor(Math.random() * 100);
                let status, emoji, advice;
                if (level < 25) {
                    status = "EXCELLENT"; emoji = "🟢"; 
                    advice = "Ship it! Code so simple even grug understand.";
                } else if (level < 50) {
                    status = "GOOD"; emoji = "🟡";
                    advice = "Acceptable. Maybe delete few line?";
                } else if (level < 75) {
                    status = "WARNING"; emoji = "🟠";
                    advice = "Getting complex. Time to refactor before ship.";
                } else {
                    status = "CRITICAL"; emoji = "🔴";
                    advice = "TOO COMPLEX! Grug brain hurt. Start over maybe.";
                }
                return `📊 Complexity Analysis

${emoji} Level: ${level}/100
${'█'.repeat(Math.floor(level/10))}${'░'.repeat(10 - Math.floor(level/10))}

Status: ${status}
Advice: ${advice}`;
            }
        },
        
        joke: {
            desc: 'Grug humor',
            run: () => {
                const j = [
                    "Why did grug cross road?\n\nTo mass delete code on other side. 🦴",
                    "How many grug to change lightbulb?\n\nOne. But first ask: need lightbulb?",
                    "Grug walk into bar.\nBarkeeper: \"Why long face?\"\nGrug: \"Just review PR. 47 files changed.\"",
                    "What grug favorite band?\n\nThe Delete Keys 🎸",
                    "Knock knock.\nWho there?\nJavaScript.\nJavaScript who?\nJavaScript undefined. Cannot read property 'who'. 😅",
                    "How grug count?\n\n0, 1, many, too many, refactor time",
                    "Why grug hate meetings?\n\nMeeting no compile. Meeting no ship."
                ];
                return j[Math.floor(Math.random() * j.length)];
            }
        },
        
        stack: {
            desc: 'Tech stack',
            run: () => `📚 grug-group420 Tech Stack:

Language:     JavaScript (simple, run everywhere)
Runtime:      Bun.js (fast, simple)
Framework:    None (framework come, framework go)
Database:     JSON file (fancy database later maybe)
Bundler:      None (script tag work fine)
CSS:          Vanilla (no need sass)
Testing:      console.log + eyes
Deployment:   git push
Monitoring:   Twitter mentions

Total Dependencies: 0* 
Lines of Config:    0*
Time to Build:      0ms*

*goals, not always reality`
        },
        
        coffee: {
            desc: 'Coffee status',
            run: () => {
                const cups = Math.floor(Math.random() * 6) + 1;
                const time = new Date().getHours();
                let mood;
                if (cups < 2) mood = "Need more coffee. Brain like molasses.";
                else if (cups < 4) mood = "Good level. Can write code now.";
                else if (cups < 5) mood = "Productive! Shipping at light speed!";
                else mood = "MAXIMUM OVERDRIVE! REFACTORING EVERYTHING! 🔥";
                
                return `☕ Coffee Status Report

Cups Today: ${cups}
${'☕'.repeat(cups)}

Current Mood: ${mood}

Time: ${time < 12 ? 'Morning - valid coffee time' : time < 17 ? 'Afternoon - questionable but ok' : 'Evening - grug sleep never'}`;
            }
        },
        
        manifesto: {
            desc: 'The grug way',
            run: () => `📜 The grug-group420 Manifesto

1. Complexity is the enemy
2. Ship early, ship often
3. Delete more than you add
4. No framework is the best framework
5. If it works, it ships
6. Simple code > clever code
7. console.log is valid debugging
8. Meetings could have been a push
9. Zero dependencies is a feature
10. The best PR is a deletion PR

Remember: grug brain small. 
Keep code small too.

🦴 grug-group420 | Est. 2026`
        },
        
        about: {
            desc: 'About grugbot',
            run: () => `🤖 grugbot420 v${grugbot.version}

A simple bot for simple developers.
Built by grug-group420.

Mode: ${serverMode ? '🟢 Server (Bun.js)' : '🟡 Standalone (embedded)'}
Philosophy: grugbrain.dev
Source: github.com/grug-group420/grugbot420
License: MIT (do what want)

Features:
• Zero dependencies
• Works offline
• Bun.js server optional
• No build step
• Copy paste friendly

Current mood: ${grugbot.mood}

🦴 Complexity is the enemy.`
        },
        
        server: {
            desc: 'Server status',
            run: () => serverMode 
                ? `🟢 Connected to grugbot420 server

Running locally via Bun.js
API: ${API_BASE}/api/cmd

Commands execute on server and return here.
Full CLI power in your browser!`
                : `�� Running in standalone mode

No local server detected.
Using embedded grugbot420.

To enable server mode:
  cd grugbot420
  bun run server/index.ts

Then refresh this page.`
        },
        
        clear: {
            desc: 'Clear output',
            run: () => '__CLEAR__'
        }
    },
    
    process(input) {
        const cmd = input.toLowerCase().trim();
        if (!cmd) return "🤔 Type 'help' to see commands.";
        if (this.commands[cmd]) return this.commands[cmd].run();
        
        // Check for partial matches
        const matches = Object.keys(this.commands).filter(c => c.startsWith(cmd));
        if (matches.length === 1) return this.commands[matches[0]].run();
        if (matches.length > 1) return `❓ Did you mean: ${matches.join(', ')}?`;
        
        return `❓ Unknown: "${cmd}"\n\nType 'help' for commands.`;
    }
};

// ===== Typing Animation =====
const phrases = ['simple tools', 'boring technology', 'code that ships', 'zero dependencies', 'the grug way'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const el = document.querySelector('.typed-text');
    if (!el) return;
    
    const current = phrases[phraseIndex];
    
    if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let delay = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
    }
    
    setTimeout(typeEffect, delay);
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', async () => {
    // Check for server connection
    await checkServer();
    
    // Start typing effect
    typeEffect();
    
    // Playground elements
    const input = document.getElementById('user-input');
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');
    const output = document.getElementById('output');
    const quickCmds = document.querySelectorAll('.quick-cmd');
    
    if (!input || !output) return;
    
    async function runCommand(cmd) {
        const command = cmd || input.value.trim();
        if (!command) return;
        
        let result;
        
        // Try server first if connected
        if (serverMode && command !== 'clear' && command !== 'server') {
            result = await serverCommand(command);
        }
        
        // Fall back to embedded
        if (!result) {
            result = grugbot.process(command);
        }
        
        if (result === '__CLEAR__') {
            output.innerHTML = '<p class="welcome-msg">🤖 Output cleared.</p>';
        } else {
            const cmdEl = document.createElement('p');
            cmdEl.style.color = '#58a6ff';
            cmdEl.style.marginTop = '1rem';
            cmdEl.textContent = `$ ${command}`;
            
            const resultEl = document.createElement('p');
            resultEl.style.whiteSpace = 'pre-wrap';
            resultEl.style.marginBottom = '0.5rem';
            resultEl.textContent = result;
            
            output.appendChild(cmdEl);
            output.appendChild(resultEl);
            output.scrollTop = output.scrollHeight;
        }
        
        input.value = '';
        input.focus();
    }
    
    // Event listeners
    runBtn?.addEventListener('click', () => runCommand());
    clearBtn?.addEventListener('click', () => {
        output.innerHTML = '<p class="welcome-msg">🤖 Output cleared.</p>';
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') runCommand();
    });
    
    quickCmds.forEach(btn => {
        btn.addEventListener('click', () => {
            runCommand(btn.dataset.cmd);
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Console easter egg
console.log(`
🦴 grug-group420 Portal

Type grugbot.process('help') for commands.
Or visit the playground above!

Server mode: Run 'bun run server/index.ts' in grugbot420 folder.

Remember: complexity bad. simple good. ship code.
`);
