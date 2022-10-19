## v1.0.0+7 (2022-10-19)


### Bug Fixes

* avoid scroll when content height is not enough ([0341cf4](https://github.com/li-yechao/paper-app/commit/0341cf4de3d730f83756bfcf01ca384aa97c32e0))
* editor not focused when click on the bottom of the blank paper ([6e9af1e](https://github.com/li-yechao/paper-app/commit/6e9af1e8d59a69af4cca193524f750dca6d1d209))
* ensure the height of the content is sufficient for a bounce scrolling effect ([7ddf551](https://github.com/li-yechao/paper-app/commit/7ddf551b344e3145b807827d83e382712a29fa08))
* ignore mouse events when the editor is not focused ([e35e0aa](https://github.com/li-yechao/paper-app/commit/e35e0aa968aa884780c37ef008d233bb9f1f6705))
* maintain focus status in desktop browser ([9f5b622](https://github.com/li-yechao/paper-app/commit/9f5b622e86905a7dfe22175d7f7da868697a01d6))
* run refresh in a timer to avoid the exception about call setState in build ([15a24e0](https://github.com/li-yechao/paper-app/commit/15a24e0440bc721d686534da59cb98cd240cdc82))
* scroll into view when focus is on the beginning of a line ([a6cdf81](https://github.com/li-yechao/paper-app/commit/a6cdf8159e0cd6cdb58700419d2a3f357a305778))
* support swipe back for the editor page ([3d277cf](https://github.com/li-yechao/paper-app/commit/3d277cf2fcca4f35cbe769405f0b81e423623ac6))
* the screen scrolls up when dom.focus is called with non-empty content ([1b627ca](https://github.com/li-yechao/paper-app/commit/1b627cae0e1d7571587724af2bea4eb90ec35610))
* use the rect of startContainer if range is at the beginning of a empty line ([51dec30](https://github.com/li-yechao/paper-app/commit/51dec30ccc9118d187db65d71b2618e16bf456c3))


## v1.0.0+6 (2022-10-14)


### Features

* auto save paper before leave editor page ([006b495](https://github.com/li-yechao/paper-app/commit/006b4952a7c632d755f3fa18007beceecf33114b))


### Bug Fixes

* avoid page scroll up when editor get focused ([8bedb90](https://github.com/li-yechao/paper-app/commit/8bedb90737021f3f94b066e1bee378e55f5d42e1))
* check todo item does not trigger onChange ([2700d1b](https://github.com/li-yechao/paper-app/commit/2700d1b4fd70d615b92b0a8276fc5da5e3846948))
* do not use member function as event listener ([e77be64](https://github.com/li-yechao/paper-app/commit/e77be6483abbb1b9303c2198669fbf84bd5d1986))


## v1.0.0+5 (2022-10-13)


### Features

* load list order by update time descending ([086c382](https://github.com/li-yechao/paper-app/commit/086c38273f6ad7cd25bb1cd1bf465dfe38cec1e4))


### Bug Fixes

* custom `CodeNode` to fix export code and line number issue ([fd3ede7](https://github.com/li-yechao/paper-app/commit/fd3ede76daebd82753c8d3f06f58eb0031edc020))
* only scroll into view if needed ([9c67edf](https://github.com/li-yechao/paper-app/commit/9c67edf17c2b5d23e07ea61feb3944ca7eba500b))
* should check graphql ressult hasException ([a974eed](https://github.com/li-yechao/paper-app/commit/a974eed278fadebe8e5706d8ae187c7ced149433))


## v1.0.0+4 (2022-10-12)


### Bug Fixes

* correct view insets when keyboard visibility changed ([5aa8539](https://github.com/li-yechao/paper-app/commit/5aa8539465875e6fb3e1c384cd8b31de7a9ef98e))
* prevent page scrolling ([bcd373b](https://github.com/li-yechao/paper-app/commit/bcd373b7b4d2d862740c85616d5e02f89c1986ee))
* scroll into view if needed ([1b7866d](https://github.com/li-yechao/paper-app/commit/1b7866da06a22725f7c57c44869c79553f6b0e6a))


## v1.0.0+3 (2022-10-11)


### Features

* use new app domain ([a25a88d](https://github.com/li-yechao/paper-app/commit/a25a88dad1fd537402ca313d45e82440f222c16c))


## v1.0.0+2 (2022-10-11)


### Features

* support create object ([7520c1f](https://github.com/li-yechao/paper-app/commit/7520c1f63bcb1bcf171dbc2e68dbf0f5b9ac17c1))
* use iframe render editor ([836c977](https://github.com/li-yechao/paper-app/commit/836c977010cae8fcb5e924f21ec16bf4f7dea94c))


### Bug Fixes

* correct placeholder position ([fb6401f](https://github.com/li-yechao/paper-app/commit/fb6401f5e6af4679bcd1798ef11d8253d8fa1626))
