---
title: Installation
description: Download the Botble AI Kit and install it for Claude Code, Codex or Gemini / Antigravity. Updating and uninstalling.
---

# Installation

## Download the kit

You can get the kit in two ways.

**Zip file.** Download `botble-ai-kit-1.0.0.zip` from the link in your purchase email or from your account dashboard on [marketplace.botble.com](https://marketplace.botble.com). Unzip it somewhere permanent, for example `~/botble-ai-kit/`. Do not leave it in your Downloads folder if you clean that folder often: updates and the Gemini workflows read from it.

**Private GitHub repository.** Add your GitHub username on the access page linked in your receipt email and GitHub invites you to the private repository `botble/ai-kit`. Cloning it gives you the same files as the zip, and updating is a `git pull`:

```bash
git clone https://github.com/botble/ai-kit.git ~/botble-ai-kit
```

Either way you end up with this layout:

```text
botble-ai-kit/
├── claude-code/    # Claude Code plugin
├── codex/          # Codex skills + install.sh
├── gemini/         # Gemini / Antigravity workflows + install.sh
├── README.md
├── LICENSE.md
└── CHANGELOG.md
```

The examples below assume the kit is in `~/botble-ai-kit/`. Change the path if you put it somewhere else.

## Claude Code

In Claude Code, run:

```text
/plugin marketplace add ~/botble-ai-kit/claude-code
/plugin install bb@botble-ai-kit
/reload-plugins
```

Or from your shell:

```bash
claude plugin marketplace add ~/botble-ai-kit/claude-code
claude plugin install bb@botble-ai-kit
```

The plugin is called `bb`, so the skills show up as `/bb:plan`, `/bb:build`, `/bb:debug`, `/bb:review`, `/bb:plugin`, `/bb:theme` and so on. You can also just describe the task: Claude loads the matching skill by itself.

### Install from GitHub instead

If you have access to the private repository, you can add it as the marketplace directly:

```text
/plugin marketplace add botble/ai-kit
/plugin install bb@botble-ai-kit
```

Because the repository is private, Claude Code needs git access to GitHub on your machine. The simplest way is the GitHub CLI:

```bash
gh auth login
```

If `marketplace add` fails with an authentication or "repository not found" error, check that you accepted the GitHub invitation and that `git clone https://github.com/botble/ai-kit.git` works in your terminal.

### Updating

- **Zip:** replace the kit folder with the new version, then run `/plugin`, open **Marketplaces** and update `botble-ai-kit` (or run `/plugin marketplace update botble-ai-kit`). Start a new session.
- **GitHub:** run `/plugin marketplace update botble-ai-kit` and start a new session.

### Uninstalling

```text
/plugin uninstall bb@botble-ai-kit
/plugin marketplace remove botble-ai-kit
```

## Codex

Run the installer from the `codex` folder:

```bash
cd ~/botble-ai-kit/codex
./install.sh
```

This copies the skills to `~/.agents/skills/`, so they are available in every project. To install for one project only:

```bash
./install.sh --project /path/to/your/botble-project
```

That puts the skills in `/path/to/your/botble-project/.agents/skills/`.

Restart Codex. Then ask naturally ("plan a new Botble plugin for ...") or mention a skill: `$botble-plan`, `$botble-build`, `$botble-debug`, `$botble-review`, `$botble-plugin` …

The skills are copied, not linked, so you can move or delete the kit folder afterwards. The installer only replaces skill folders it installed itself; if a folder with the same name already exists, it skips it and tells you.

### Optional: AGENTS.md snippet

The `codex` folder contains `AGENTS-snippet.md`. Paste it into your project's `AGENTS.md` to tell Codex to plan before non-trivial work, debug before fixing and review before committing.

### Updating

Get the new version (replace the folder or `git pull`), then run the installer again with the same options:

```bash
cd ~/botble-ai-kit/codex
./install.sh
```

### Uninstalling

```bash
./install.sh --uninstall
# for a project install:
./install.sh --project /path/to/your/botble-project --uninstall
```

## Gemini / Antigravity

Gemini and Antigravity install per project. Run:

```bash
cd ~/botble-ai-kit/gemini
./install.sh /path/to/your/botble-project
```

This adds workflows to `/path/to/your/botble-project/.agents/workflows/` (`bb-plan.md`, `bb-build.md` …). Inside that project, run `/bb-plan`, `/bb-build`, `/bb-debug`, `/bb-review`, `/bb-plugin`, `/bb-theme` and so on.

::: warning Keep the kit folder in place
The workflows point at the skill files inside the kit folder. If you move or delete `~/botble-ai-kit`, the workflows stop working. If you do move it, run `./install.sh` again from the new location.
:::

Repeat the command for each Botble project you want to use the kit in.

### Updating

Get the new version (replace the folder at the same path or `git pull`), then run the installer again for each project:

```bash
cd ~/botble-ai-kit/gemini
./install.sh /path/to/your/botble-project
```

### Uninstalling

```bash
./install.sh --remove /path/to/your/botble-project
```

## Check that it works

Open your Botble project in your assistant and ask something only the kit knows how to answer well, for example:

```text
/bb:plan add a "featured" on/off switch to my plugin's items
```

Use `$botble-plan` in Codex or `/bb-plan` in Antigravity. The assistant should read your project's code and come back with a short plan file instead of starting to write code. Next: [Your First Task](./getting-started.md).
