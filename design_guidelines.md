# Design Guidelines: Modern News Broadcasting Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from contemporary news platforms like BBC News, The Verge, and Medium to create a content-first, high-readability news experience with modern card-based layouts and intuitive navigation.

## Core Design Elements

### Typography Hierarchy
- **Verdana** font family throughout (as specified)
- **Headline (H1)**: 32px (mobile: 24px), bold weight, tight line-height (1.2)
- **Article Title (H2)**: 20px (mobile: 18px), bold weight, used in NewsCard components
- **Description/Body**: 16px (mobile: 14px), regular weight, line-height 1.6 for optimal readability
- **Category Tags**: 12px, uppercase, semi-bold, tracking-wide
- **Timestamps**: 14px, regular weight, muted styling

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Grid gaps: gap-6 (desktop), gap-4 (mobile)

### Component Library

**Header Navigation**
- Fixed/sticky top bar with site logo (left), category navigation (center/left), optional search icon (right)
- Height: h-16, clean white background with subtle bottom border
- Category tabs as horizontal scrollable list on mobile

**NewsCard Component**
- Card structure: Thumbnail (16:9 aspect ratio), title, description (2-3 line clamp), category tag, timestamp
- White background with subtle shadow on hover
- Border radius: rounded-lg
- Padding: p-4
- Thumbnail should fill width, followed by content stack with gap-3

**Grid Layout**
- Desktop: 3-column grid (grid-cols-3) for main content area
- Tablet: 2-column grid (md:grid-cols-2)
- Mobile: Single column (grid-cols-1)
- Featured/Hero article: Full-width or 2-column span at top

**CategoryTabs Component**
- Horizontal tab bar with active state using accent color #0086df
- Active tab: background in accent color, white text
- Inactive tabs: transparent background, dark text
- Border-bottom indicator on active tab (3px thick)

**MediaPlayer Component**
- Video: 16:9 aspect ratio player with standard controls
- Audio: Horizontal waveform-style player or minimal control bar
- Image: Full-width display with zoom capability
- All media: Rounded corners (rounded-lg)

**Advertisement Section**
- Sidebar placement (desktop): Right rail, sticky position, width: w-80
- In-feed placement (mobile): Between every 6-8 articles
- Clear "Advertisement" label above, subtle border to distinguish from content
- Dimensions: Standard IAB sizes (300x250 for sidebar, responsive for in-feed)

### Page Structure

**Homepage Layout**
- Header with category navigation
- Hero/Featured article section: Large thumbnail (50-60% viewport height), overlaid title and description with blurred background behind text
- Main content grid with 3-column layout (desktop)
- Advertisement sidebar (desktop) or in-feed ads (mobile)
- Pagination or infinite scroll at bottom

**Article Detail View**
- Full-width hero image or media player
- Article metadata: category tag, timestamp, author (if applicable)
- Content area: max-w-3xl centered for optimal reading
- Related articles section at bottom (3-column grid)

### Visual Treatment
- **Cards**: White background, shadow-sm, hover:shadow-md transition
- **Category Tags**: Small pill-shaped badges with accent color #0086df background, white text, rounded-full
- **Timestamps**: Subtle gray text positioned below title/description
- **Borders**: Very subtle (border-gray-200) for separation, avoid heavy lines
- **Spacing**: Generous whitespace between cards and sections for clean, uncluttered feel

### Images
**Hero Section**: Yes - Featured article with large 16:9 image (approximately 60vh on desktop, 40vh on mobile) with gradient overlay at bottom for text readability

**NewsCard Thumbnails**: 16:9 ratio images for all articles, filled to card width, object-cover for consistent sizing

**Placeholder Images**: For audio posts without custom thumbnails, use abstract waveform or microphone icon on solid background

All images should have subtle rounded corners (rounded-lg) and smooth loading states

### Responsive Behavior
- **Desktop (lg:)**: 3-column news grid, sidebar ads, horizontal category tabs
- **Tablet (md:)**: 2-column grid, in-feed ads, scrollable category tabs
- **Mobile**: Single column, stacked layout, touch-optimized spacing (increased tap targets)

### Accessibility
- Sufficient contrast ratios for all text
- Focus states on interactive elements using accent color
- Semantic HTML structure (articles, sections, nav)
- Alt text for all images and media