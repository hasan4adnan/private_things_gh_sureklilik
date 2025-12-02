feat: add record tracking and enhance keyboard shortcuts

- Add maximum count tracking with localStorage persistence
- Implement Arrow Up/Down keyboard shortcuts for counter control
- Add record celebration message when reaching new maximum
- Add milestone celebration for value 100
- Implement localStorage persistence for App2 component state
- Add page fade-in animation on initial load
- Add record indicator in footer showing maximum count
- Enhance click counter milestones (add 20th click celebration)

Keyboard Enhancements:
- Arrow Up key increments counter
- Arrow Down key decrements counter
- Updated keyboard hint to show all shortcuts

Record Tracking:
- Track maximum count value across sessions
- Display record indicator in footer
- Show celebration when matching or breaking record
- Persistent storage of maximum value

App2 Improvements:
- Add localStorage persistence for clicked state
- Add localStorage persistence for click count
- Add 20th click milestone celebration
- Better state initialization from localStorage

Visual Enhancements:
- Page fade-in animation on load
- Record message with pulse animation
- Better visual feedback for achievements
- Improved milestone celebrations

Code Quality:
- Proper useEffect dependencies
- Better state management
- Improved localStorage handling
- Enhanced user experience

