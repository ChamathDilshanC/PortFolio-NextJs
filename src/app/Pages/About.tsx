"use client";

import { Terminal } from "@/components/ui/terminal";
import { useState } from "react";

interface Command {
  id: string;
  label: string;
  command: string;
  output: string;
  color: string;
}

const commands: Command[] = [
  {
    id: "whoami",
    label: "whoami",
    command: "whoami",
    output: "Chamath Dilshan - Full Stack Engineer",
    color: "text-cyan-400"
  },
  {
    id: "skills",
    label: "ls skills/",
    command: "ls skills/",
    output: "frontend/ backend/ database/ devops/ mobile/",
    color: "text-blue-500"
  },
  {
    id: "stack",
    label: "cat stack.json",
    command: "cat skills/frontend/stack.json",
    output: '{ "frameworks & Libraries": ["React", "Next.js", "TypeScript", "React Native"] }',
    color: "text-yellow-500"
  },
  {
    id: "projects",
    label: "git log",
    command: "git log --oneline --graph",
    output: "* 🚀 Deployed scalable web applications\n* 📱 Built responsive mobile interfaces\n* ⚡ Optimized performance by 40%",
    color: "text-green-500"
  },
  {
    id: "passion",
    label: "echo $PASSION",
    command: "echo $PASSION",
    output: '" • Clean Code • Innovation • Problem Solving "',
    color: "text-purple-400"
  },
  {
    id: "connect",
    label: "./connect.sh",
    command: "./connect.sh",
    output: "✨ Ready to collaborate on your next project!\n\n📧 Email: dilshancolonne123@gmail.com\n📱 Phone: +94 7561 6104\n\n🔗 Connect with me:\n  → GitHub: https://github.com/ChamathDilshanC\n  → LinkedIn: https://www.linkedin.com/in/chamathdilsahnc/\n  → X (Twitter): https://x.com/ChamathColonne\n  → YouTube: https://www.youtube.com/@ChamathDilshan-m7d",
    color: "text-green-400"
  }
];

export function Aboutpage() {
  const [terminalLines, setTerminalLines] = useState<Array<{ type: 'command' | 'output', text: string, color?: string }>>([
    { type: 'output', text: 'Welcome! Click a command to execute it.', color: 'text-gray-500' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);



  const typeCommand = async (cmd: Command) => {
    if (isTyping) return;

    setIsTyping(true);
    const commandText = `> ${cmd.command}`;

    // Add empty line for command
    setTerminalLines(prev => [...prev, { type: 'command', text: '', color: 'text-[#3b3bed]' }]);

    // Type out the command character by character
    for (let i = 0; i <= commandText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTerminalLines(prev => {
        const newLines = [...prev];
        newLines[newLines.length - 1] = { type: 'command', text: commandText.slice(0, i), color: 'text-[#3b3bed]' };
        return newLines;
      });
    }

    // Wait before showing output
    await new Promise(resolve => setTimeout(resolve, 400));

    // Add output lines
    const outputLines = cmd.output.split('\n');
    for (const line of outputLines) {
      setTerminalLines(prev => [...prev, { type: 'output', text: line, color: cmd.color }]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Add empty line for spacing
    setTerminalLines(prev => [...prev, { type: 'output', text: '', color: 'text-gray-500' }]);

    setIsTyping(false);
  };

  const clearTerminal = () => {
    setTerminalLines([
      { type: 'output', text: 'Terminal cleared. Click a command to execute it.', color: 'text-gray-500' }
    ]);
  };

  return (
    <div className="w-full mx-auto px-4 md:px-8 lg:px-12">

       {/* Command Buttons - Top */}
        <div className="bg-muted/30 backdrop-blur-sm border border-border rounded-lg p-4">
          <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Available Commands
          </h3>
          <div className="flex flex-wrap gap-2">
            {commands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => typeCommand(cmd)}
                disabled={isTyping}
                className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 ${
                  isTyping
                    ? 'opacity-50 cursor-not-allowed bg-muted'
                    : 'hover:bg-accent hover:text-accent-foreground bg-background border border-border hover:scale-105 active:scale-95 hover:border-primary/50'
                }`}
              >
                <span className="text-green-500">$</span> {cmd.label}
              </button>
            ))}
            <button
              onClick={clearTerminal}
              disabled={isTyping}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 ${
                isTyping
                  ? 'opacity-50 cursor-not-allowed bg-muted'
                  : 'hover:bg-destructive/10 hover:text-destructive bg-background border border-destructive/30 hover:scale-105 active:scale-95 hover:border-destructive'
              }`}
            >
              <span className="text-red-500">$</span> clear
            </button>
          </div>
        </div>

        {/* Terminal - Below Commands */}
        <Terminal className="w-full min-h-[420px] [&_pre]:min-h-[320px] [&_code]:min-h-[320px]">
          <div className="space-y-1">
            {terminalLines.map((line, index) => (
              <div key={index} className={`${line.color || 'text-white'} font-mono text-sm`}>
                {line.text}
              </div>
            ))}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"></span>
            )}
          </div>
        </Terminal>
      </div>
  );
}
