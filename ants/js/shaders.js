
function createObjectBuffers(gl, obj) {
	obj.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	obj.indexBufferTriangles = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // normal buffer
    var createNormalBuffer = true;
    if (createNormalBuffer && obj.vertexNormals) {
        obj.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, obj.vertexNormals, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

	var edges = new Uint16Array(obj.numTriangles*3*2);

	for (var i = 0; i < obj.numTriangles; i++) {
		edges[i*6+0] = obj.triangleIndices[i*3+0];
		edges[i*6+1] = obj.triangleIndices[i*3+1];
		edges[i*6+2] = obj.triangleIndices[i*3+0];
		edges[i*6+3] = obj.triangleIndices[i*3+2];
		edges[i*6+4] = obj.triangleIndices[i*3+1];
		edges[i*6+5] = obj.triangleIndices[i*3+2];
	}

	obj.indexBufferEdges = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function drawObject(gl, obj, shader, fillColor, lineColor) {
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.enableVertexAttribArray(shader.aPositionIndex);
	gl.vertexAttribPointer(shader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

    // Normals:
    if (shader.aNormalIndex && obj.normalBuffer &&
        shader.uViewSpaceNormalMatrixLocation) {
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
        gl.enableVertexAttribArray(shader.aNormalIndex);
        gl.vertexAttribPointer(shader.aNormalIndex, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix3fv(shader.uViewSpaceNormalMatrixLocation,
            false, SglMat4.to33(this.stack.matrix));
    }

	gl.enable(gl.POLYGON_OFFSET_FILL);
	gl.polygonOffset(1.0, 1.0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.uniform4fv(shader.uColorLocation, fillColor);
	gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);

	gl.disable(gl.POLYGON_OFFSET_FILL);

	gl.uniform4fv(shader.uColorLocation, lineColor);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
	gl.drawElements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGNED_SHORT, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	gl.disableVertexAttribArray(shader.aPositionIndex);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

lambertianSingleColorShader = function (gl) {

    var shaderProgram = gl.createProgram();

    shaderProgram.vertex_shader = "\
        precision highp float;     \n\
           \n\
        uniform mat4 uProjectionMatrix;     \n\
        uniform mat4 uModelViewMatrix;   \n\
        uniform mat3 uViewSpaceNormalMatrix;   \n\
        attribute vec3 aPosition;  \n\
        attribute vec3 aNormal;    \n\
        varying vec3 vpos;   \n\
        varying vec3 vnormal;\n\
           \n\
        void main()    \n\
        {  \n\
              // vertex normal (in view space)     \n\
              vnormal = normalize(uViewSpaceNormalMatrix * aNormal); \n\
               \n\
              \n\
            // vertex position (in view space)   \n\
              vec4 position = vec4(aPosition, 1.0);\n\
              vpos = vec3(uModelViewMatrix *  position);  \n\
               \n\
               \n\
               \n\
              // output    \n\
              gl_Position = uProjectionMatrix *uModelViewMatrix * position;   \n\
        }  \n\
    ";

    shaderProgram.fragment_shader = "\
        precision highp float;     \n\
           \n\
        varying vec3 vnormal;\n\
        varying vec3 vpos;   \n\
        uniform vec4 uLightDirection;\n\
           \n\
        // positional light: position and color\n\
        uniform vec3 uLightColor;  \n\
        uniform vec4 uColor;    \n\
           \n\
        void main()    \n\
        {  \n\
              // normalize interpolated normal     \n\
              vec3 N = normalize(vnormal);     \n\
               \n\
              // light vector (positional light)   \n\
              vec3 L = normalize(-uLightDirection.xyz); \n\
               \n\
              // diffuse component     \n\
              float NdotL = max(0.3, dot(N, L));   \n\
              vec3 lambert = (uColor.xyz * uLightColor) * NdotL;    \n\
              highp vec4 ambient = vec4(0.0, 0.0, 0.0, 0.0); \n\
              gl_FragColor  = ambient + vec4(lambert, 1.0);     \n\
          }  \n\
    ";


      // create the vertex shader
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
       gl.shaderSource(vertexShader, shaderProgram.vertex_shader);
      gl.compileShader(vertexShader);

      // create the fragment shader
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, shaderProgram.fragment_shader);
      gl.compileShader(fragmentShader);


      // Create the shader program
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      shaderProgram.aPositionIndex = 0;
      shaderProgram.aNormalIndex = 2;
      gl.bindAttribLocation(shaderProgram, shaderProgram.aPositionIndex, "aPosition");
      gl.bindAttribLocation(shaderProgram, shaderProgram.aNormalIndex, "aNormal");
      gl.linkProgram(shaderProgram);

    shaderProgram.vertexShader = vertexShader;
    shaderProgram.fragmentShader = fragmentShader;

      // If creating the shader program failed, alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
        var str = "";
        str += "VS:\n" + gl.getShaderInfoLog(vertexShader) + "\n\n";
        str += "FS:\n" + gl.getShaderInfoLog(fragmentShader) + "\n\n";
        str += "PROG:\n" + gl.getProgramInfoLog(shaderProgram);
        alert(str);
      }


      shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram,"uProjectionMatrix");
      shaderProgram.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram,"uModelViewMatrix");
      shaderProgram.uViewSpaceNormalMatrixLocation = gl.getUniformLocation(shaderProgram,"uViewSpaceNormalMatrix");
      shaderProgram.uLightDirectionLocation = gl.getUniformLocation(shaderProgram,"uLightDirection");
      shaderProgram.uLightColorLocation = gl.getUniformLocation(shaderProgram,"uLightColor");
      shaderProgram.uColorLocation = gl.getUniformLocation(shaderProgram,"uColor");

      return shaderProgram;
};

uniformShader = function (gl) {//line 1, Listing 4.3{
	var vertexShaderSource = "\
		uniform   mat4 uModelViewMatrix;	\n\
		uniform   mat4 uProjectionMatrix;	\n\
		attribute vec3 aPosition;					\n\
		void main(void)										\n\
		{																	\n\
		gl_Position = uProjectionMatrix * uModelViewMatrix	\n\
			* vec4(aPosition, 1.0);  				\n\
		}";

	var fragmentShaderSource = "\
		precision highp float;					\n\
		uniform vec4 uColor;						\n\
		void main(void)									\n\
		{																\n\
			gl_FragColor = vec4(uColor);	\n\
		}	";//line}

	// create the vertex shader
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);

	// create the fragment shader
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);

	// Create the shader program
	var aPositionIndex = 0;
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.bindAttribLocation(shaderProgram, aPositionIndex, "aPosition");
	gl.linkProgram(shaderProgram);

	// If creating the shader program failed, alert
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		var str = "Unable to initialize the shader program.\n\n";
		str += "VS:\n"   + gl.getShaderInfoLog(vertexShader)   + "\n\n";
		str += "FS:\n"   + gl.getShaderInfoLog(fragmentShader) + "\n\n";
		str += "PROG:\n" + gl.getProgramInfoLog(shaderProgram);
		alert(str);
	}

	shaderProgram.aPositionIndex = aPositionIndex;
	shaderProgram.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
	shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	shaderProgram.uColorLocation               = gl.getUniformLocation(shaderProgram, "uColor");

	shaderProgram.vertex_shader = vertexShaderSource;
	shaderProgram.fragment_shader = fragmentShaderSource;

	return shaderProgram;
};
