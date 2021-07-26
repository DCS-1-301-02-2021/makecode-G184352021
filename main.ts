scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    9 9 9 9 9 9 9 9 . . . . . . . .
    . 1 1 9 9 9 . . . . . . . . . .
    . 1 1 1 . . . . . . . . . . . .
    . . 1 1 1 . . . . . . . . . . .
    . . . 1 1 1 1 1 f . . . . . . .
    . 2 2 2 1 1 f f f 6 6 6 6 6 6 6
    2 2 5 5 1 1 f 1 1 1 1 1 1 1 6 6
    2 2 5 5 1 1 1 1 1 1 1 1 1 1 . .
    . 2 2 2 1 1 1 1 1 1 . . . . . .
    . . . 1 1 1 . . . . . . . . . .
    . 1 1 1 1 9 . . . . . . . . . .
    9 9 9 9 9 9 9 9 . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . 1 1 1 . . . . . . . . . . .
        f f d d d d d d d d d d d d b b
        . . 1 1 1 . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . 4 4 4 4 4 4 . . . . . . . .
        . 4 4 4 4 4 4 4 4 . . . . . . .
        4 4 9 9 4 4 4 4 4 4 4 4 4 4 4 4
        4 4 9 9 4 4 4 4 4 4 b b b b b b
        4 4 4 4 4 4 4 4 4 4 b b b b b b
        4 4 4 4 4 4 4 4 4 4 4 4 3 4 4 4
        4 4 4 4 4 4 4 4 4 b b b b b . .
        4 4 4 4 4 4 4 4 4 b b b b . . .
        4 4 4 4 4 4 4 4 4 4 4 . . . . .
        . 4 4 4 4 4 4 4 4 4 . . . . . .
        . . b b b b b b b . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
