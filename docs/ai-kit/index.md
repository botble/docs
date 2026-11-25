---
title: Botble AI Kit
description: Skills and agents that teach Claude Code, Codex and Gemini / Antigravity how Botble CMS works, so they plan, build, debug and review Botble plugins, themes and ecommerce features the Botble way.
---

# Botble AI Kit

Skills and agents that teach your AI coding assistant how Botble CMS actually works.

AI coding assistants know Laravel well, but Botble has its own way of doing things: Form Builder and Table Builder, hooks, permissions, settings pages, idempotent plugin migrations, theme shortcodes, asset publishing, Envato rules. Without that knowledge an assistant guesses, and the code it writes often runs but does not fit the CMS.

The **Botble AI Kit** gives the assistant that knowledge. It plans, builds, debugs and reviews Botble plugins, themes and ecommerce features the way the Botble team does.

[Buy the Botble AI Kit](https://marketplace.botble.com/ai-kit)

## What you get

- **4 workflow skills**: `plan`, `build`, `debug` and `review`. Together they take a request from a one-page plan to verified, reviewed code.
- **16 Botble knowledge skills**: coding conventions, plugins, themes, ecommerce, admin UI, forms, admin tables and menus, REST API, assets and JS, media, SEO, multilingual sites, operations, seeders, translations and troubleshooting.
- **6 specialist agents**: plugin scaffolder, migration writer, theme shortcoder, Envato/CodeCanyon auditor, payment gateway integrator and ecommerce product architect.

See [Skills & Agents](./skills.md) for the full list and example prompts.

## How it works

The kit is a set of instructions and small scripts that your assistant reads when a task needs them. You can call a skill by name (for example `/bb:plan` in Claude Code), or just describe the task and the matching skill loads on its own.

Everything runs on your machine. The kit never sends your code anywhere; your assistant talks to its own AI provider exactly as it does without the kit.

The assistant does not just write code and stop. The skills make it check its own work as it goes:

- `php -l` on every changed PHP file
- Laravel Pint for code style
- a Blade linter for templates
- PHPUnit tests
- asset builds and publishing when CSS or JS changes

## Who it is for

- Developers building plugins or themes on Botble CMS, for themselves or for clients.
- Agencies customizing Botble-based products (Shofy, Martfury, Homzen and others).
- Authors preparing Botble plugins or themes for CodeCanyon.

You still need to know enough PHP to read a diff. The kit makes the assistant much better at Botble, but it does not replace your review.

## Supported assistants

| Assistant | How the kit is installed | How you call a skill |
|---|---|---|
| **Claude Code** | As a plugin named `bb` | `/bb:plan`, `/bb:build`, `/bb:review` … |
| **Codex** | Skills copied to `~/.agents/skills` or a project | `$botble-plan`, `$botble-build` … |
| **Gemini / Antigravity** | Workflows added to a project | `/bb-plan`, `/bb-build` … |

## Requirements

- A Botble CMS project (Botble 7.x).
- PHP 8.3+ and Composer, used for the verification steps.
- Node 20.19+ (or 22.12+) for asset builds.
- One of the supported assistants above, installed and signed in.
- Optional: Python with `deep-translator` (`pip install deep-translator`) for the translation scripts.

## Next steps

- [Installation](./installation.md): install the kit for your assistant
- [Your First Task](./getting-started.md): the plan → build → debug → review workflow with an example
- [Skills & Agents](./skills.md): every skill and agent, with example prompts
- [FAQ](./faq.md): licences, updates, privacy and support
