Basic:

```js
initialState = { visible: true }

;<DialogContainer
  showClose
  showMini
  visible={state.visible}
  onClose={() => setState({ visible: false })}
  onMiniify={() => alert('minimize')}
>
  Hi, some content!
</DialogContainer>
```
