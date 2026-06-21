# Festember Fantasy Football – Instagram Comment Exporter

A lightweight Chrome extension for exporting Instagram comments into JSON format.

Designed for Festember Fantasy Football prediction contests, where Instagram comments are used as entries and need to be processed later for scoring.

---

## Features

- Export Instagram comments to JSON
- Preserves:
  - Username
  - Comment text
  - Comment timestamp

- Includes export metadata:
  - Post URL
  - Post shortcode
  - Export date/time
  - Extension version
  - Comment count

- Automatically removes duplicate comment detections caused by Instagram's DOM structure
- No Instagram login handling required
- No external servers or APIs

---

## Installation

1. Download or clone this repository.

2. Open Chrome and navigate to:

   ```
   chrome://extensions
   ```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the extension folder.

The extension should now appear in the Chrome toolbar.

---

## Usage

### 1. Open an Instagram post

Navigate directly to the Instagram post whose comments you want to export. Reload the page to prevent any issues and to ensure the extension is able to connect to the page.

Example:

```
https://www.instagram.com/p/XXXXXXXXXXX/
```

### 2. Expand comments

The extension only exports comments that are currently loaded in the page.

Before exporting:

- Click **View all comments**
- Expand any additional comment sections
- Scroll until all desired comments are visible

### 3. Export

1. Click the extension icon.
2. Click **Export Comments**.
3. A JSON file will be downloaded automatically.

---

## Output Format

Example:

```json
{
  "postUrl": "https://www.instagram.com/p/DOvAsRMAY7c/",
  "postCode": "DOvAsRMAY7c",
  "exportedAt": "2026-06-21T16:30:15.123Z",
  "commentCount": 127,
  "extensionVersion": "1.0",
  "comments": [
    {
      "username": "example_user",
      "comment": "2-1-0",
      "timestamp": "2026-06-21T07:51:52.000Z"
    }
  ]
}
```

---

## Known Limitations

### Instagram UI Variants

Instagram occasionally serves different page layouts.

The scraper is designed around the layout currently used by Instagram and may stop working if Instagram significantly changes its comment structure.

### Comments Must Be Loaded

The extension cannot export comments that Instagram has not yet loaded into the page.

Always expand and scroll comments before exporting.

### Replies

Comment replies may appear differently depending on Instagram's current UI and expansion state.

Verify exported data before using it for scoring.

---

## Troubleshooting

### "Open an Instagram post first."

The extension only works on Instagram post pages.

Valid example:

```
https://www.instagram.com/p/XXXXXXXXXXX/
```

If you are on:

- The Instagram home feed
- A profile page
- Reels
- Explore
- Messages

the export button will not run.

Open the post directly and try again.

---

### "Failed to connect to page."

The popup could not communicate with the scraper running on the page.

Common causes:

- The extension was reloaded while the Instagram tab was already open.
- The page was opened before the extension was installed.
- Chrome has not injected the content script into the page.

Try:

1. Refresh the Instagram tab.
2. Close and reopen the extension popup.
3. Click **Download Comments** again.

---

### "No comments found."

The scraper could not locate any comments on the page.

Possible causes:

- Comments have not been expanded.
- The page has not finished loading.
- Instagram is displaying a different page layout.
- You are not viewing the post directly.

Try:

1. Refreshing the page.
2. Expanding all comments.
3. Opening the post directly using its URL.
4. Running the export again.

---

### Exported comment count seems incorrect

Instagram occasionally serves different versions of the post UI.

If exported data appears incomplete or incorrect:

1. Copy the post URL.
2. Open it directly in a new tab.
3. Refresh the page.
4. Expand comments again.
5. Run the export.

In testing, exporting from a directly loaded and refreshed post page has been the most reliable workflow.

## Version History

### v1.0

- Initial release
- JSON export support
- Metadata export
- Duplicate detection
- Popup UI
- Custom extension branding

---

## License

Internal Festember utility. Use and modify as needed.
