function stepGame() {
    scene.camera.point.x += scene.camera.velocity.x;
    scene.camera.point.y += scene.camera.velocity.y;
    scene.camera.point.z += scene.camera.velocity.z;

    for (var i = 0, obj; obj = scene.objects[i]; i++) {
        obj.point.x += obj.velocity.x;
        obj.point.y += obj.velocity.y;
        obj.point.z += obj.velocity.z;
    }

    render(scene);

    setTimeout(stepGame, 200);
}
