---
name: figma-console
description: Inspect and modify live Figma documents with Figma Console MCP. Use for document and component inspection, edits, and screenshot verification through the Desktop Bridge.
---

# Figma Console

Use the registered Figma Console MCP tools. Take the target document and design
requirements from the request and applicable project instructions.

## Connection and Document

1. Check `figma_get_status`, then `figma_list_open_files` before reading or
   changing the document.
2. If the Desktop Bridge is disconnected or the target file is not open, stop
   and report the exact user action required. Do not substitute cached exports,
   stale node IDs, REST data, or another MCP.
3. If the target document cannot be identified from the request and project
   context, ask before making changes.
4. Resolve pages and nodes again in the current session. Node IDs may become
   stale after reconnects or document changes.

## Inspect Before Mutating

- Inspect the target hierarchy, layout, variables, styles, descriptions,
  annotations, variants, and instances relevant to the request.
- Search existing components with `figma_search_components` before creating or
  instantiating one. Do not reuse remembered component node IDs.
- Use dedicated tools when they express the operation exactly. Use focused
  `figma_execute` reads for document structure or properties not exposed by a
  dedicated tool.
- Do not mutate during inspection.

## Mutations

- Use `figma_execute` for cohesive mutations requiring the Plugin API. Keep
  each change scoped enough to diagnose failures and preserve unrelated nodes
  and user changes.
- Inspect `resultAnalysis.warning` after execution. Empty or null results may
  indicate a silent failure; inspect the resulting state before reporting
  success.

## Visual Verification

After each meaningful visual mutation:

1. Capture the changed node with `figma_capture_screenshot`, which captures
   current plugin state.
2. Inspect alignment, spacing, sizing, typography, contrast, hierarchy,
   clipping, and instance configuration against the requested design.
3. Correct observed defects and repeat for at most three correction passes.
   Report any remaining defect with its exact node instead of silently
   accepting it.
4. Capture a final screenshot of every completed top-level target.
