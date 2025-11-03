# Interaction Flow Guide for MasterJi Platform

## Overview
This document outlines the detailed interaction patterns for the MasterJi platform. It defines how UI components behave when triggered, how they communicate with each other, and their visual feedback patterns. All interactions follow the established design principles and color schema.

## Core Interaction Principles

### 1. Visual Feedback System
- All interactive elements provide immediate visual feedback
- Hover states: subtle color changes or shadow increases
- Active states: color intensity changes or border modifications
- Loading states: appropriate indicators based on action type
- Success/Error states: color-coded feedback with appropriate icons

### 2. Animation Guidelines
- All transitions use ease-in-out timing function
- Duration: 200-300ms for most interactions
- Transform-based animations preferred for performance
- No animations longer than 500ms for UI interactions
- Consistent easing across all components

## Detailed Component Interactions

### 1. Chat Interface Flow

#### Trigger: Chat Button/Icon Activation
- **Visual Trigger**: Clicking the chat icon/button (orange-400)
- **Animation**: Slide-in from right (300ms ease-in-out)
- **Response Canvas**: 
  - Full-height panel with orange-50 background
  - Header with chat title and close button
  - Message history container with scrollable area
  - Input area with message field and send button

#### Response Streaming
- **Visual Indication**: Typing indicators with orange-400 dots
- **Streaming Animation**: Text appears character by character (60ms per character)
- **Message Display**: 
  - User messages: right-aligned, orange-400 background
  - AI responses: left-aligned, orange-100 background
  - Both with rounded-2xl corners and appropriate padding

#### Chat Controls
- **Send Button**: 
  - Default: Disabled when message field is empty
  - Active: bg-orange-400, enabled when text is present
  - On click: Message sent with subtle vibration feedback
- **Clear Chat**: Reduces opacity on hover, confirmation dialog on click
- **Close Chat**: Smooth slide-out animation (300ms)

### 2. Learning Mode Selection

#### Trigger: Mode Selection Dropdown
- **Visual Trigger**: Dropdown button with orange-400 border and arrow icon
- **Dropdown Appearance**: Smooth slide-down animation (200ms)
- **Options Display**: 
  - List of learning modes with icons
  - Hover states with orange-100 background
  - Selected option highlighted with checkmark

#### Active Mode Chip Implementation
- **Selection Event**: 
  - Selected mode becomes active immediately
  - Dropdown closes after selection
  - Active mode chip appears above content area
  - Chip design: bg-orange-400, text-white, rounded-full, px-4 py-2
  - Chip includes: mode name, close icon (X)
- **Chip Behavior**:
  - Fixed position above content
  - On close click: chip disappears with fade-out animation (200ms)
  - Resets to default mode if applicable
  - Alternative mode can be selected after removal

#### Multi-Mode Selection
- **Visual State**: Multiple chips can be active simultaneously
- **Layout**: Chips arranged in horizontal row with spacing
- **Max Selection**: Visual indication when maximum modes reached
- **Validation**: Prevents incompatible mode combinations

### 3. Course/Content Selection Flow

#### Trigger: Course Card Click
- **Visual Trigger**: Clicking on any course card
- **Hover State**: Card lifts slightly with increased shadow
- **Selection Feedback**: Subtle border animation (2px orange-400 border)
- **Expanded View**: Slide-in panel with detailed course information

#### Course Details Display
- **Panel Animation**: Smooth slide-in from bottom (300ms)
- **Content Structure**:
  - Header with course title and close button
  - Description with scrollable content area
  - Learning objectives with checkmark icons
  - Prerequisites section
  - Enrollment buttons with clear CTAs
- **Actions**: 
  - "Start Learning": Primary button (bg-orange-400)
  - "Save for Later": Secondary button with bookmark icon

### 4. Language Selection Flow

#### Trigger: Language Dropdown
- **Visual Trigger**: Globe icon with dropdown indicator
- **Dropdown Content**: Alphabetically sorted language options
- **Active State**: Currently selected language highlighted
- **Selection Flow**: 
  - Click language → immediate update to UI
  - Loading spinner during content translation
  - Success confirmation with toast notification

#### Language Chip Display
- **Visual**: Language code as chip (e.g., "EN", "HI")
- **Placement**: Top navigation area
- **Interaction**: Click for dropdown with alternative languages
- **Persistence**: Remains visible until changed

### 5. Progress Tracking Interactions

#### Trigger: Progress Bar Interaction
- **Visual Trigger**: Clicking or hovering progress indicators
- **Detailed View**: Tooltip with percentage and milestone information
- **Navigation**: Clicking progress section navigates to that content
- **Status Indicators**: 
  - Completed: bg-orange-400
  - In progress: bg-orange-100 with progress animation
  - Not started: bg-gray-200

#### Achievement System
- **Visual Trigger**: Completion of learning milestones
- **Notification**: Slide-in toast with achievement details
- **Badge Display**: Badges appear in user profile with animation
- **Celebration Effect**: Confetti animation on major milestones

### 6. Search and Filter Flow

#### Trigger: Search Bar Activation
- **Visual Trigger**: Clicking search input expands to full width
- **Search Results**: Dropdown showing filtered results
- **Animation**: Smooth appearance with fade-in (200ms)
- **Result Selection**: Click navigates to selected content

#### Filter Interactions
- **Filter Panel**: Slides in from left (400ms) when filter icon clicked
- **Filter Chips**: Applied filters appear as chips with remove option
- **Apply/Reset**: Clear buttons with orange-400 primary for apply
- **Real-time Filtering**: Results update as filters are adjusted

### 7. User Profile Interactions

#### Trigger: Profile Menu Open
- **Visual Trigger**: Clicking user avatar/name in top navigation
- **Menu Appearance**: Dropdown with slide-down animation
- **Menu Content**:
  - User information with editable options
  - Learning history
  - Achievement badges
  - Settings links
  - Logout option

#### Profile Updates
- **Form Interactions**: 
  - Input fields with validation feedback
  - Save button disabled until changes made
  - Success feedback with checkmark animation
- **Avatar Upload**: Drag-and-drop area with visual feedback

### 8. Assessment/Quiz Flow

#### Trigger: Start Quiz Button
- **Visual Trigger**: Clicking "Start Quiz" button (bg-orange-400)
- **Pre-quiz Modal**: Brief instructions with "Begin" button
- **Quiz Interface**:
  - Question counter at top
  - Timer display
  - Question text with clear typography
  - Answer options with radio buttons/checkboxes

#### Answer Submission
- **Immediate Feedback**: 
  - Correct answers: Green checkmark with success animation
  - Incorrect answers: Orange X with explanation
- **Progress Saving**: Answers auto-saved as user progresses
- **Review Mode**: Post-quiz review with correct/incorrect indicators
- **Results Display**: Score with visual progress circle

### 9. Notification System

#### Trigger: Notification Event
- **Visual Indicator**: Orange-400 badge with count on notification icon
- **Notification Panel**: Slides in from top-right (300ms)
- **Notification Types**:
  - Success: Green background with checkmark
  - Warning: Orange background with warning icon
  - Error: Red background with error icon
  - Information: Blue background with info icon

#### Notification Management
- **Auto-dismiss**: Non-critical notifications disappear after 5 seconds
- **Manual Dismiss**: Close button with X icon
- **Mark as Read**: Visual change without removal
- **View All**: Link to full notification history

### 10. Video Learning Interface

#### Trigger: Video Card Click
- **Modal Appearance**: Full-screen video player with fade-in (300ms)
- **Player Controls**:
  - Play/Pause: Large central button with hover effect
  - Progress bar: Orange-400 progress indicator
  - Volume controls with hover appearance
  - Fullscreen toggle

#### Interactive Elements
- **Chapter Navigation**: Timeline with key points marked
- **Transcript Panel**: Toggle to show/hide transcript
- **Notes Function**: Add button with slide-in note panel
- **Speed Controls**: 1x, 1.25x, 1.5x, 2x options with active state

## Animation Specifications

### 1. Entrance Animations
- **Slide In**: Transform with 300ms duration (ease-in-out)
- **Fade In**: Opacity from 0 to 1 with 200ms duration
- **Scale In**: Transform scale from 0.9 to 1 with 250ms duration

### 2. Exit Animations
- **Slide Out**: Reverse of slide-in with same duration
- **Fade Out**: Opacity from 1 to 0 with 200ms duration
- **Scale Out**: Transform scale from 1 to 0.9 with 250ms duration

### 3. Micro-interactions
- **Button Press**: Scale to 0.95 with 100ms duration
- **Hover Effects**: Background color transition with 150ms duration
- **Loading States**: Smooth indeterminate animations
- **Success/Failure**: Checkmark/cross animations with 300ms

## Responsive Behavior

### 1. Mobile Interactions
- **Touch Targets**: Minimum 44px touch area
- **Swipe Gestures**: Horizontal swipe for carousel navigation
- **Pull to Refresh**: Available where applicable
- **Bottom Sheet**: Modal content appears as bottom sheet

### 2. Tablet Interactions
- **Adaptive Layouts**: Adjusted component sizes and spacing
- **Multi-column Views**: Maintained component functionality
- **Optimized Touch Targets**: Slightly smaller than mobile

### 3. Desktop Interactions
- **Hover States**: More prominent than mobile
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Tooltip Previews**: Show on hover for icons and complex elements

## Accessibility Considerations

### 1. Keyboard Navigation
- **Focus States**: Visible orange-400 outline for all interactive elements
- **Tab Order**: Logical sequence following visual flow
- **Shortcuts**: Available for common actions

### 2. Screen Reader Support
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: Announce dynamic content changes
- **Landmark Regions**: Clear navigation structure

### 3. Color Contrast
- **Minimum Ratio**: 4.5:1 for normal text, 3:1 for large text
- **Alternative Indicators**: Non-color based feedback where applicable
- **High Contrast Mode**: Support for browser-based high contrast

## Performance Guidelines

### 1. Animation Performance
- **Hardware Acceleration**: Use transform and opacity properties
- **Frame Rate**: Maintain 60fps for all animations
- **Throttling**: Debounce rapid interactions

### 2. Loading States
- **Skeleton Screens**: For content loading (orange-100 placeholders)
- **Progress Indicators**: Appropriate for different loading scenarios
- **Fallback Content**: Maintain functionality during loading

### 3. Interaction Responsiveness
- **Feedback Timing**: Immediate visual feedback within 100ms
- **Processing Indicators**: Clear indication during longer operations
- **Progress Communication**: Inform users of operation status

This interaction flow guide ensures consistent, intuitive, and accessible user experiences across all MasterJi platform features while maintaining visual consistency with the established design system.