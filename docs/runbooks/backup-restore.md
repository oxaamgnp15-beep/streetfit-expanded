# Backup & Restore Runbook
- Postgres: daily base backup + WAL; retain 7/30 days.
- Verify restores quarterly: spin up ephemeral DB, run Prisma migrations, restore dump, compare row counts.
- RTO ≤ 4h, RPO ≤ 24h.
