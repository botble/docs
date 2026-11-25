---
title: Your First Task
description: The Botble AI Kit workflow (plan, build, debug, review) with a worked example, tips for writing good requests and when to skip planning.
---

# Your First Task

The kit is built around four steps:

1. **Plan**: the assistant reads your code and writes a one-page plan. Nothing is changed yet.
2. **Build**: after you approve the plan, it implements it step by step and checks each step.
3. **Debug**: when something breaks, it finds the root cause before it touches code.
4. **Review**: it reviews the change for bugs, Botble conventions, security and Envato rules.

The examples use Claude Code commands. In Codex use `$botble-plan`, `$botble-build` …; in Gemini / Antigravity use `/bb-plan`, `/bb-build` … (see [Skills & Agents](./skills.md)).

## Example: a settings page for your plugin

Say you have a plugin called `weather` and you want an admin settings page with an API key and an on/off switch.

### 1. Plan

Open your Botble project in Claude Code and run:

```text
/bb:plan add a settings page to my weather plugin with an API key field and an "Enable weather widget" on/off switch
```

The assistant looks at your plugin and at how Botble builds settings pages, then may ask you a few short questions, each with a proposed default, for example who is allowed to change the setting or whether the switch is on or off by default. Reply "ok" to accept the defaults, or answer the ones you care about.

It then writes a plan file in your project, under `plans/`, for example `plans/261125-1430-weather-settings-page/plan.md`. The plan is about one page and covers:

- the goal, and where the change belongs in your code
- decisions and assumptions (defaults, permissions)
- the steps, each one a small group of files with a way to check it
- data changes, permissions, translations and settings
- risks, how the result will be verified, and what is out of scope

No code has been written at this point.

### 2. Approve

Read the plan. If something is wrong, say so ("store the API key encrypted", "only super admins can see this page") and the assistant updates the plan. When it looks right:

```text
Looks good, approved.
```

### 3. Build

```text
/bb:build plans/261125-1430-weather-settings-page/plan.md
```

The assistant works through the plan one step at a time. After each group of files it runs the checks that apply: `php -l`, Laravel Pint, the Blade linter, PHPUnit tests and an asset build when CSS or JS changed. It ticks off steps in the plan as it goes, so you can see where it is, and it ends with a short report of what changed and how it was verified.

If the code turns out to differ from what the plan assumed, it stops and tells you instead of improvising.

### 4. Review

```text
/bb:review
```

The review reads the pending changes (and the plan, if there is one) and reports findings by severity, each with a `file:line` reference and a suggested fix. It does not change code unless you ask it to. Ask it to fix what you agree with, then review again if the fixes were large.

You can also review a commit, a pull request, or a whole plugin or theme before a release:

```text
/bb:review platform/plugins/weather before CodeCanyon submission
```

### When something breaks: debug

```text
/bb:debug the weather settings page shows "This action is unauthorized" for my editor role
```

The debug skill finds and proves the cause first (logs, permissions, cache, hooks and other common Botble causes), then applies a minimal fix and checks it.

## Skip planning for small changes

You do not need a plan for every change. For a small, clear request (one field, one column, a string, a fix whose cause you already know), go straight to build:

```text
/bb:build add a "Phone" text field to the contact form in my weather plugin
```

The assistant writes a three-line note (what, where, how it will verify) and does the work. If the request turns out to be bigger, for example it needs a new table, permission or payment flow, it switches to planning on its own.

## Writing good requests

- **Name the place.** "in `platform/plugins/weather`" or "in the Shofy theme" saves a lot of searching.
- **Say what done looks like.** "Admins can turn it off and the widget disappears from the homepage" is better than "add a toggle".
- **Mention constraints.** "This plugin is sold on CodeCanyon", "must work with multiple languages", "don't edit core".
- **One feature per request.** Plan two features separately rather than together.
- **Paste the real error.** For bugs, include the exact message, the URL and what you did, or the relevant lines from `storage/logs`.

## AI still makes mistakes

The skills make the assistant check its own work, but it is still an AI. Read the diff before you commit, test the feature in the browser, and keep your project in git so you can roll back. Treat the assistant like a fast junior developer who knows Botble well: helpful, but its work still needs your review.
