# Repository and library paths

## Canonical git repository

**Name:** VSGH-WEBSITE  
**Path:** `/Users/vaibhavkumarn/Desktop/VSGH/VSGH-WEBSITE`  
**Role:** Implementation repository (Next.js bootstrap) plus Stage 2 decision records and indexes created under VSGH-CURSOR-TASK-001.

This path has **no trailing space**. WEB-049 recommended repository name: `VSGH-WEBSITE`.

## Documentation library (not this git root)

**Path:** `/Users/vaibhavkumarn/Desktop/VSGH/VSGH WEBSITE `  
**Issue:** The folder name ends with a **trailing space**, which breaks some tools and is not the canonical repo name.

**Contents:** Corporate Phases 0–27, WP01–WP04, Cursor governance (~656 Markdown files).

**Action taken (VSGH-CURSOR-TASK-001):** Recorded. The library was **not** renamed and **not** copied wholesale into git (that would duplicate the working set). The git workspace root was **not** renamed. Decision records and indexes live in this repository under `docs/`. Library files that were corrected in place remain in the library path; copies of those corrected files are also stored under `docs/library/` for version control.

## Do not use

- `VSGH WEBSITE ` (trailing space) as a git remote or package name
- WP03 evaluation folder as the technology baseline
