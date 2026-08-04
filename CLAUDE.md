# vendor — the React advertiser self-service portal

The client-facing surface. Anything that changes what an advertiser may do to their own campaign, or what figures they are shown, is in scope.

---

## RULE — the business-logic document must stay in sync

[`../btc-mock/business-logic.html`](../btc-mock/business-logic.html) is the client-facing reference describing **every business rule the platform
follows**. BTS management reads it. It is the document they will point at during a commercial
dispute about what the platform does.

**Whenever you change business logic, you update that document as the final step of the task —
before reporting the work complete.** A code change that silently invalidates it is not finished,
it is finished-and-wrong, because the next person to read the document will be misled by it.

### When this rule fires

On any change that alters **what the system decides**, not how it is implemented. Indicative, not
exhaustive:

| Area | Examples |
| --- | --- |
| Pricing | CPM resolution order, rate-card precedence, effective dating |
| Billing | Prepaid deduction, credit limits, invoicing, VAT, invoice status, payment application, ageing |
| Campaigns | State machine, launch preconditions, client-editable fields per status, pacing tolerance |
| Validation | Confidence threshold, the two-tier gate, auto-reject vs escalate, rejection reasons |
| Channel A | Parcel ingestion, label-roll and QR lifecycle, worker assignment rule, offline idempotency, scan billing |
| Channel B | Playlist resolution, dayparting, clock-skew window, playback dedupe, command expiry, offline definition |
| Measurement | The footfall formula or its assumptions, inventory arithmetic, any analytics definition |
| Access | Roles, the RBAC matrix, what a role may reach |
| Alerts | Which notification fires when, and who receives it |
| Automation | A scheduled job's timing or behaviour |
| Defaults | Any tunable value listed in the document's §14 |
| Vocabulary | A new or removed status, reason or method that a user can see |

### When it does NOT fire

Behaviour-preserving refactors, renames, formatting, dependency upgrades, test-only changes,
logging, performance work, infrastructure and CI.

> **The test, when unsure:** would a BTS manager reading the document today now be *misled*?
> If yes, the rule fires. If the document is still true, it does not.

### What to do

1. Implement and verify the change first. The document is updated **last**, against behaviour you
   have actually confirmed — never against what you intend to build.
2. Find the affected section(s). The document is section-numbered; §14 holds the settings tables
   and §16 the open decisions.
3. Update prose, tables and diagrams to describe the new behaviour.
4. If you introduced a rule, add a rule box (`<div class="rule">`) stating the rule **and the
   reasoning behind it**. That reasoning is the most valuable content in the document — it is what
   lets BTS tell a business decision they can overrule from a constraint they cannot.
5. Move anything newly settled out of §16; add anything your change left open.
6. Update §14 if you changed a default.
7. Validate before finishing:

```bash
cd ../btc-mock && python3 - <<'EOF'
import re
s = open('business-logic.html').read()
for t in ['div','section','table','tr','td','th','ul','ol','li','svg','dl']:
    o, c = len(re.findall(r'<%s[ >]' % t, s)), len(re.findall(r'</%s>' % t, s))
    print(f"{t:8} {o:4}/{c:<4} {'OK' if o == c else '** MISMATCH **'}")
ids  = set(re.findall(r'id="(s\d+)"', s))
href = set(re.findall(r'href="#(s\d+)"', s))
print("broken TOC links:", href - ids or "none")
EOF
```

8. Say in your closing summary that the document was updated, and name the sections.

### How to write it

The audience is **non-technical** — the client reads this.

- No jargon, no internal names, no file paths, no code. Gloss any unavoidable term in half a
  sentence at first use.
- State rules as *"when X happens, the system does Y, because Z"*.
- Match the existing structure and brand: BTS palette from `../btc-mock/brand/DESIGN-SYSTEM.md`,
  numbered steps, rule boxes, tables, inline SVG. Never green, amber or purple — the brand book
  forbids them.
- **Never let the document overstate.** If something is partly built, say so. An honest gap list is
  worth more than a confident claim, and the document's credibility is the whole point of it.

### Practical notes

- `btc-mock` is a **separate git repository** from this one. Updating the document is a separate
  commit in a separate repo — say so rather than implying one commit covers both.
- If `btc-mock` is not checked out next to this repo, **say so explicitly in your summary** and
  name the sections that need updating. Do not silently skip the rule.
- If a change is large enough that the document needs restructuring rather than editing, flag it and
  propose the restructure. Do not bolt contradictory text onto a section that no longer fits.
- The Uzbek glossary in `../btc-mock/brand/PRODUCT-SPEC.md` §1 is authoritative for user-facing wording.
  Use its term rather than inventing one.
