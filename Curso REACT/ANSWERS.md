# Checkpoint Answers

1. React Native's default `flexDirection` is `column`, so children are laid out vertically. On the web, CSS defaults to `row`.
2. `justifyContent` distributes children along the main axis, while `alignItems` positions them along the cross axis. The direction of each axis depends on `flexDirection`.
3. In a row, `flex: 1` lets a child grow to take an equal share of the available space. On the outermost screen `View`, it makes the view expand to fill its parent, typically the full screen.
4. `cover` fills the image area while preserving its aspect ratio, cropping parts that do not fit. `contain` shows the entire image without cropping, potentially leaving empty space.
5. `StyleSheet.create` keeps styles organized outside JSX and helps catch invalid style properties during development. It also makes styles reusable and easier to maintain.
6. Android does not render iOS's `shadow*` properties. Use `elevation` on Android to display a similar shadow.
