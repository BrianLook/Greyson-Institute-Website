# Greyson Institute — Project checkpoint (November 13, 2026)

This is a concise operational checkpoint for resuming Greyson's website, CE Shop integration, and search discovery work. It intentionally excludes private email content, credentials, student data, unreleased promotions, and financial terms.

## Google Search Console — indexing review completed
- Domain **greysoninstitute.com** is verified, and Search Console is linked to the Greyson Institute GA4 web stream.
- **https://greysoninstitute.com/sitemap.xml** was already submitted September 21, 2026. Search Console showed **Success**, last read November 7, 2026, and **25 discovered URLs**. **Do not resubmit the sitemap.**
- The Page indexing report (last updated November 8, 2026) showed **20 indexed** and **8 not indexed** known URLs. These counts describe all known pages, not only sitemap entries.
- Five URLs listed as **Discovered — currently not indexed** were inspected and submitted for indexing on November 13, 2026 after successful Google live-access tests:
  1. `/florida-online-real-estate-education`
  2. `/florida-60-hour-broker-post-license-requirements`
  3. `/florida-real-estate-license-reactivation`
  4. `/how-to-become-florida-real-estate-broker`
  5. `/how-to-become-florida-real-estate-instructor`
- Indexing **was requested**, not yet confirmed. Avoid repeatedly requesting the same pages.
- The other 3 non-indexed URLs are alternate **www/http** homepage versions marked **Page with redirect**. Safari confirmed `https://www.greysoninstitute.com/` redirects to the preferred `https://greysoninstitute.com/`. Redirects are expected; do not select **Validate Fix** for intentional redirects.
- **SEO work is paused here.** Next time: check Search Console **Indexing → Pages** for updated indexed counts, and if needed inspect individual URLs for real indexing outcomes; do not equate request success with indexing success.
- Later technical improvement: change sitemap `lastmod` to reflect real page edits rather than every deployment.

## CE Shop — website and reporting
- Partner course links and responsive official promotional banner tested on desktop/mobile.
- Find My Exact Path tested through active Broker 14-hour CE results and first-license course options.
- Contact form submitted and delivered; `generate_lead` registered as a GA4 key event.
- `ce_shop_click` verified in GA4 Realtime and Exploration; event custom dimensions `course_category` and `click_source` are registered. Older clicks may show `(not set)` because they predate registration.
- CE Shop Student History and Current Commission reports load and showed 0 results in initial date-limited tests.
- Affiliate Admin **Order Report** appeared blank; **Commission History** returned HTTP 500. Support was contacted; provider confirmation of account/report functionality is pending.
- Course clarification from provider on November 13: the **28-hour reinstatement course appears twice in the CE Shop catalog, but is the same course**. The 4-hour **Teaching Techniques** instructor course is **not confirmed as offered**; do not advertise a full instructor CE pathway via The CE Shop until support confirms availability.

## Business phone
- The business line was tested successfully on the dedicated old iPhone **with Wi-Fi disabled**. Keep the old phone as Greyson's business phone; no eSIM transfer needed at present.
- Friendly, welcoming business-phone answer and voicemail wording was agreed.

## Next priorities
- Wait for support confirmation about CE Shop admin reporting and Instructor CE availability.
- Get final partner-approved promotional wording and eligibility before activating December launch offers.
- Recheck Google indexing status at a later date; the initial indexing and redirect review is complete.
