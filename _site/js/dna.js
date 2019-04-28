
    /* Set up the scene ***************/
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera( -20, 20, 5, -5, 0.1, 100000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, 150);
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor( 0x262626, 1);

    /* Create strand materials ***************/
    var outer_strands = new THREE.LineBasicMaterial({
        color: 0x336699, linewidth: 5
    });
    var inner_strands = new THREE.LineBasicMaterial({
        color: 0xFFFFFF, linewidth: 5
    });

    var material_g = new THREE.LineBasicMaterial({
        color: 0x00FF00, linewidth: 2
    });
    var material_y = new THREE.LineBasicMaterial({
        color: 0xffff00, linewidth: 2
    });
    var material_b = new THREE.LineBasicMaterial({
        color: 0x0000FF, linewidth: 2
    });
    var material_r = new THREE.LineBasicMaterial({
        color: 0xFF0000, linewidth: 2
    });

    /* Generate vertices ***************/
    var strand = false;
    var cross_sections = [];
    var geometry1 = new THREE.Geometry();
    for (var i = -10; i < 50; i+=0.1){
        geometry1.vertices.push(
            new THREE.Vector3( i, 3 * Math.sin(i/4), 3 * Math.cos(i/4) )
        );

        if ( Math.floor(i * 10) % 10 == 0 ) {
            var cross_section_1 = new THREE.Geometry();
            var cross_section_2 = new THREE.Geometry();
            var start = new THREE.Vector3( i, 3 * Math.sin(i/4), 3 * Math.cos(i/4) );
            var end =  new THREE.Vector3( i, -3 * Math.sin(i/4), -3 * Math.cos(i/4) );
            var middle = new THREE.Vector3( i , 0, 0 );

            cross_section_1.vertices.push( start );
            cross_section_1.vertices.push( middle );
            cross_section_2.vertices.push( middle );
            cross_section_2.vertices.push( end );

            if (strand) {
                cross_sections.push(new THREE.Line( cross_section_1, material_g ));
                cross_sections.push(new THREE.Line( cross_section_2, material_y ));
                strand = !strand;
            } else {
                cross_sections.push(new THREE.Line( cross_section_1, material_b ));
                cross_sections.push(new THREE.Line( cross_section_2, material_r ));
                strand = !strand;
            }
        }
    }

    var geometry2 = new THREE.Geometry();
    for (var i = -10; i < 50; i+=0.1){
        geometry2.vertices.push(
            new THREE.Vector3( i, -3 * Math.sin(i/4), -3 * Math.cos(i/4) )
        );
    }

    /* Add dna to scene  ******************/
    var line1 = new THREE.Line( geometry1, outer_strands );
    var line2 = new THREE.Line( geometry2, outer_strands );
    scene.add( line1 );
    scene.add( line2 );
    for (var i = 0; i < cross_sections.length; i++) {
        scene.add(cross_sections[i]);
    }


    camera.position.z = 3;
    camera.lookAt(new THREE.Vector3(-1,-3,0));

    line1.rotateZ(-0.2);
    line2.rotateZ(-0.2);
    for (var i = 0; i < cross_sections.length; i++) {
            cross_sections[i].rotateZ(-0.2);
    }

    camera.position.x = 20;
    var render = function () {
        requestAnimationFrame( render );
        for (var i = 0; i < cross_sections.length; i++) {
            cross_sections[i].rotateX(0.01);
        }
        line1.rotateX(0.01);
        line2.rotateX(0.01);

        renderer.render(scene, camera);
    };

    render();