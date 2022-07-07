

# 监听LocalStorage变化



### 重写setItem

```
 watchThemeTypeChange() {
  var orignalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, newValue) {
   var setItemEvent = new Event("setItemEvent");
   setItemEvent.newValue = newValue;
   window.dispatchEvent(setItemEvent);
   orignalSetItem.apply(this, arguments);
  }
  const setTheme = this.setTheme
  //添加监听器
  window.addEventListener("setItemEvent", function (e) {
   if (e.newValue == 'custom-dark' || e.newValue == 'custom-variable' || e.newValue == 'custom-default') {
    console.log(e.newValue);
   }
  });
 }
```

### 挂载时调用

```
 componentDidMount() {
  watchThemeTypeChange();
}
```

### 组件卸载时删除监听器

```
 componentWillUnmount() {
  window.removeEventListener("setItemEvent", function (e) {
   if (e.newValue == 'custom-dark' || e.newValue == 'custom-variable' || e.newValue == 'custom-default') {
     console.log(e.newValue);
   }
  });
 }
```

