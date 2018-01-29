```js
<PopupDialog visible level="info" confirmText="OK" showClose>
  <h1>I am title!</h1>
  <p>
    VeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongText
  </p>
</PopupDialog>
```

Error Level:

```js
;<div>
  <PopupDialog visible level="info" confirmText="OK">GGGGGGGGGGGGGG</PopupDialog>
  <PopupDialog visible level="warning" confirmText="OK" />
  <PopupDialog visible level="error" confirmText="OK" />
  <PopupDialog visible level="charging" confirmText="OK" />
  <PopupDialog visible level="ok" confirmText="OK" />
  <PopupDialog visible level="remind" confirmText="OK" />
  <PopupDialog visible level="delete" confirmText="OK" />
  <PopupDialog visible level="help" confirmText="OK" />
  <PopupDialog
    visible
    level="Error_but_system_still_can_process"
    confirmText="OK"
  />
</div>
```

Custom Icon:

```js
<PopupDialog
  visible
  customIcon="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"
  confirmText="OK"
/>
```
