# The CE Shop Affiliate Onboarding — Greyson Institute

Last updated: September 30, 2026

## Confirmed partnership model

Greyson Institute is moving forward with an **affiliate marketing partnership** with The CE Shop.

- Greyson Institute is the public-facing website, licensing-guidance layer, and referral source.
- The CE Shop remains the **school of record** for partner-delivered online courses.
- The CE Shop handles checkout/payment, student enrollment, course delivery, course-specific support, student correspondence, certificates, compliance, and applicable regulatory completion reporting.
- Greyson does **not** need to collect course payments through Stripe for The CE Shop partner courses.
- The CE Shop stated that Greyson does **not** need to register as the Florida real estate school under this affiliate arrangement.
- The agreement is non-exclusive.

## Commercial terms stated on the discovery call

- Affiliate commission: **30% of net revenue after the student's discount is applied**.
- Payout frequency: **quarterly**.
- Current payout method described: check.
- No-cost affiliate partnership.
- Greyson will receive access to an affiliate back end with enrollment and commission reporting.
- The partner back end was described as showing student name, email, physical address, enrolled course, and commission information.

Treat the signed affiliate agreement as the controlling source if any term differs.

## Co-branded site and tracking

The CE Shop will create a co-branded partner site using a URL in the form:

`<slug>.theceshop.com`

The team recommended choosing a short, simple slug. Proposed first choice: **greyson**, subject to availability.

Important attribution rule:

- Students should use Greyson's co-branded link or a deep link within that co-branded site.
- A customer who later purchases directly on TheCEShop.com is not automatically attributed to Greyson.
- The CE Shop said an enrollment may sometimes be manually moved to Greyson if the student reaches out and confirms the referral.
- Existing CE Shop customers can still purchase through Greyson's co-branded link and use their existing CE Shop account.
- Retail promo codes work on the co-branded partner site.

## Deep links

Once Greyson's co-branded site exists, Greyson can create deep links directly to specific Florida pages/courses within the co-branded site.

The desired Greyson flow is:

**GreysonInstitute.com → Find My Path → Greyson guide/result → exact tracked CE Shop course page → The CE Shop checkout/classroom**

All live CE Shop URLs should be stored centrally in:

`lib/ce-shop-partner.ts`

Do not scatter raw partner URLs throughout the site.

## Marketing

The CE Shop stated that Greyson may:

- Publicly say that **Greyson Institute partners with The CE Shop**.
- Create its own marketing materials.
- Use CE Shop-provided co-branded marketing assets.
- Use retail and partner promo codes on the co-branded site.
- Receive promotional calendars/codes ahead of time.

Paid-search restriction stated on the call:

- Greyson may not bid on **The CE Shop** brand name in paid search.

Launch benefit discussed:

- The CE Shop offers an exclusive **50% off launch week** for the affiliate launch, coordinated Monday through Sunday.

## Support

The CE Shop handles course-related customer service.

Examples:
- login/password issues
- course access
- technical issues
- course-content questions
- billing
- refunds
- certificates
- classroom issues

Greyson handles:
- Florida licensing-path guidance
- helping users understand which education category likely applies
- directing students to the correct tracked partner page
- partner escalation when needed

The CE Shop said Greyson will have business-development contacts for escalations.

## Refund / wrong-course discussion

The CE Shop said it handles course changes/refunds. The representative stated that refunds are generally straightforward when a student has not started the course and the request is within 30 days, while noting they may consider other situations case by case.

Do not publish that verbal description as a guaranteed refund policy. Use the written CE Shop refund policy when received.

## Florida completion reporting discussion

The representative described a **2:00 PM Mountain Time business-day reporting cutoff** for completion reporting, with completions after that cutoff generally reporting the next business day and weekend completions reporting Monday.

Do not publish that exact cutoff as a guaranteed policy until Greyson receives written confirmation or official provider documentation.

Florida DBPR deadlines remain separate. Students must still complete all DBPR renewal/application/payment steps applicable to their record.

## Disclosure

The CE Shop said Greyson should include a disclosure explaining, in substance, that:

- Greyson has an agreement with The CE Shop to promote online real estate licensing courses.
- Greyson is not the developer of those partner courses.
- Course-content questions should be directed to The CE Shop.

The CE Shop said it will email recommended disclosure wording.

**Do not finalize or replace the temporary website disclosure until the written wording arrives.**

## Onboarding requirements from Greyson

The CE Shop requested:

1. Horizontal Greyson Institute logo.
2. W-9 for BrightPath Education Group, LLC.
3. Preferred co-branded URL slug.
4. Signed affiliate agreement after The CE Shop sends it.

After signing, The CE Shop stated that the co-branded site and marketing assets generally take about **2 business days** to create, followed by onboarding.

## Still waiting on

- Current affiliate agreement.
- Exact written disclosure language.
- Confirmation that the requested co-branded URL slug is available.
- Live co-branded partner URL.
- Florida course/deep links.
- Written/official reporting-cutoff documentation.
- Final partner onboarding/login information.

## Website rule until onboarding is complete

Do not show a live enrollment button unless its destination is a confirmed Greyson-tracked CE Shop URL.

Until then:
- keep enrollment buttons in pending state;
- keep Greyson guidance and provider responsibilities clearly separated;
- do not claim Greyson developed, delivers, certifies, or reports completion for The CE Shop courses;
- do not add Stripe checkout for CE Shop course sales.
