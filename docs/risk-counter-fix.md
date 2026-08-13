# Risk Counter Fix

Updated the Explorer risk inspection counter behavior.

Risk entries are now counted as inspected when a user:

- expands a risk card,
- clicks the quick-add button, or
- clicks the expanded Add to Basket button.

This fixes the confusing behavior where the counter could remain at `0/56` when users interacted primarily through basket controls.
