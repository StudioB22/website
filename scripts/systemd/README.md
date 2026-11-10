# Nightly local CI (tier L3, ADR-0005)

`studiob22-website-nightly.timer` runs `mise x -- just nightly` every day at 05:20 (catching up
after the PC was off); a failure raises a desktop notification. Install once, from the repository
root, by copying the units (not linking them: a checked-out branch without `scripts/systemd/`
would make linked units vanish):

```bash
cp scripts/systemd/studiob22-website-nightly.service scripts/systemd/studiob22-website-nightly-failed.service scripts/systemd/studiob22-website-nightly.timer ~/.config/systemd/user/ && systemctl --user daemon-reload && systemctl --user enable --now studiob22-website-nightly.timer
```

The units run whatever branch is checked out at 05:20. Re-copy them after a change.

Check: `systemctl --user list-timers studiob22-website-nightly.timer`; logs:
`journalctl --user -u studiob22-website-nightly.service`.
