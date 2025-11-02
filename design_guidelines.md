# Design Guidelines: Library Workflow Flowchart Application

## Design Approach

**Selected Approach**: Design System (Material Design) with Reference Inspiration from Whimsical and Lucidchart

**Justification**: This is a utility-focused workflow visualization tool requiring clarity, interactivity, and intuitive navigation. Material Design's emphasis on clear hierarchy, motion design, and interactive feedback perfectly supports flowchart interaction patterns. We'll draw inspiration from Whimsical's clean aesthetic and Lucidchart's professional workflow visualization.

**Core Principles**:
- Clarity over decoration: Every visual element serves the workflow understanding
- Purposeful animation: Motion guides attention to active processes
- Spatial organization: Clear visual hierarchy in flowchart layout
- Interactive feedback: Immediate visual response to user actions

## Typography

**Font Family**: 
- Primary: 'Inter' (Google Fonts) - excellent readability for node labels and UI text
- Monospace: 'Roboto Mono' for technical identifiers (ISBN, codes)

**Type Scale**:
- App Title/Header: text-2xl font-semibold (24px)
- Node Titles: text-base font-medium (16px)
- Node Descriptions: text-sm (14px)
- UI Labels: text-xs font-medium uppercase tracking-wide (12px)
- Gateway Decision Text: text-sm font-semibold (14px)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Component padding: p-4 or p-6
- Section gaps: gap-4 or gap-6
- Margins between major sections: mb-8
- Node spacing: 8-12 units between connected nodes

**Application Structure**:
- **Top Navigation Bar**: Fixed header (h-16) with app title, controls, and language toggle
- **Control Sidebar**: Left-aligned panel (w-64) with zoom controls, filter options, and legend
- **Main Canvas**: Full remaining viewport with pan/zoom flowchart display
- **Detail Panel**: Right slide-out panel (w-96) for click-to-expand node information

## Component Library

### Flowchart Nodes

**Start/End Nodes**:
- Rounded pill shape (rounded-full)
- Compact size: px-6 py-3
- Border: border-2
- Shadow: shadow-lg for depth

**Process Nodes**:
- Rectangle with rounded corners (rounded-lg)
- Standard size: min-w-48 px-6 py-4
- Border: border-2
- Contains icon (top), title, and brief description

**Gateway Nodes** (Decision Points):
- Diamond shape (rotate-45 transform)
- Size: w-32 h-32
- Border: border-2
- Decision text positioned at cardinal points

**Category-Specific Nodes**:
- Book registration: Unique border treatment
- Author registration: Distinct styling
- Category creation: Separate visual identity

### Connectors

**Flow Lines**:
- Stroke width: 2px for primary paths
- Arrow indicators at connection endpoints
- Curved connectors (using SVG paths) for visual clarity
- Animated dash effect for active/highlighted paths

**Path Types**:
- Success paths: Solid lines
- Error/correction paths: Dashed lines
- Alternative routes: Lighter opacity

### Interactive Elements

**Control Panel**:
- Zoom controls: +/- buttons with current zoom percentage display
- Reset view button
- Pan lock toggle
- Auto-fit to screen
- Export options

**Node Interaction States**:
- Default: base styling with subtle shadow
- Hover: Lift effect (translate-y-1, increased shadow)
- Active/Selected: Highlighted border, glowing effect
- Completed: Check mark indicator, reduced opacity
- In-progress: Pulsing animation on border

### Color-Coded Elements

**Label System Visualization**:
- Red label: Distinct indicator for one category
- Yellow label: Different visual marker
- White label: Third category identifier
- Display as small badge/tag on relevant book nodes

**Path Differentiation**:
- Book registration path: One treatment
- Author registration path: Different treatment  
- Category creation path: Third visual distinction
- Use subtle variations in connector styling

### Detail Panel Components

**Expanded Node View**:
- Header with node type and title (p-6)
- Icon representation (mb-4)
- Full description text (mb-6)
- Related information cards (grid grid-cols-2 gap-4)
- Action buttons at bottom (flex justify-end gap-2)
- Close button (top-right)

**Process Details**:
- Step number indicator
- Required fields list
- Validation rules
- Next possible steps preview

### Navigation Controls

**Toolbar** (Top bar):
- Logo/title (left)
- View mode toggles: List view / Flowchart view
- Search/filter input
- Settings icon
- Language switcher (PT/EN)

**Sidebar Legend**:
- Node type explanations with color swatches
- Symbol meanings
- Keyboard shortcuts reference
- Quick navigation links to workflow sections

## Animations

**Use Sparingly - Only for Functional Purposes**:

**Flow Progression**:
- Subtle pulse animation on current active node (2s duration, infinite)
- Connector line "drawing" effect when showing path (0.5s)
- Node fade-in when entering viewport (0.3s)

**User Interactions**:
- Smooth panel slide-in/out (0.3s ease-in-out)
- Node expand/collapse (0.2s)
- Zoom transitions (0.4s)

**State Changes**:
- Success checkmark animation (0.5s scale + fade)
- Error shake effect (0.3s)

**Avoid**: Continuous background animations, decorative motion, parallax effects

## Accessibility

- Keyboard navigation: Tab through all interactive nodes, Enter to expand
- Focus indicators: Clear outline (ring-2 ring-offset-2)
- Screen reader labels for all icons and visual-only elements
- Consistent interaction patterns across all nodes
- High contrast between node borders and backgrounds
- Minimum touch target: 44x44px for all clickable elements
- ARIA labels for flowchart relationships and states

## Images

**No Hero Image Required** - This is a utility application focused on workflow visualization.

**Icon System**:
- Use Heroicons via CDN for all UI controls and node icons
- Book icon for book registration nodes
- User icon for author nodes  
- Tag icon for category nodes
- Various process icons (camera for OCR, printer, database, etc.)

## Responsive Considerations

**Desktop** (primary experience):
- Full canvas with sidebar and detail panels
- Optimal flowchart viewing at 1440px+ width

**Tablet**:
- Collapsible sidebar
- Detail panel as overlay
- Touch-optimized zoom controls

**Mobile**:
- Single column layout
- Simplified flowchart with horizontal scroll
- Bottom sheet for node details
- Essential controls only