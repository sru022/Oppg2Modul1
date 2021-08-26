
// NB! Legg merke til bruk av spesialenkeltapostrof (alt+�)
let VSHADER_SOURCE = `
	attribute vec4 a_Position;
	attribute vec4 a_Color; 
	varying vec4 v_Color; 
	void main() 
	{
	  gl_Position = a_Position; //Setter posisjonen
	  v_Color = a_Color; //Videresender fargen
	}`;

// Fragment shader program
// Bruker prefiks u_ for � indikere uniform
let FSHADER_SOURCE = ` 
   precision mediump float;
   varying vec4 v_Color;    //Mottas via vaying-parametret i verteksshaderen. Interpolert verdi. 
   void main() 
   {
     gl_FragColor = v_Color; //Setter fargeverdi
   }`;

function main()
{
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('webgl');
    if (!gl)
    {
        console.log('Fikk ikke tak i rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE))
    {
        console.log('Feil ved initialisering av shaderkoden.');
        return;
    }

    let coordinateF = coordinateSystem(gl);
    let triangleF = triangle(gl);
    let arrowF = arrow(gl);

    //Rensker skjermen:
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawLine = gl.drawArrays(gl.TRIANGLES, 0, triangleF);

}

function coordinateSystem(gl)
{
    let linesV = new Float32Array([-1.0, 0,
        1.0, 0,
        0, -1.0,
        0, 1.0
    ]);

    let linesC = new Float32Array([1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0
    ]);

    n = 4;
    //LINJER
    let positionBuffer = gl.createBuffer();
    if (!positionBuffer)
    {
        console.log('Fikk ikke laget et bufferobjekt!?');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, linesV, gl.STATIC_DRAW);
    let posAttrib = gl.getAttribLocation(gl.program, 'a_Position');
    if (posAttrib < 0)
    {
        console.log('Fant ikke parametret a_Position i shaderen!?');
        return -1;
    }
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(posAttrib);

    // FARGE TIL KORDINATSYSTEM
    let colorBuffer = gl.createBuffer();
    if(!colorBuffer)
    {
       console.log('Fikk ikke laget et colorBufferobjekt!?')
       return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, linesC, gl.STATIC_DRAW);
    let posColor = gl.getAttribLocation(gl.program, 'a_Color');
    if(posColor < 0)
    {
       console.log('Fant ikke parametret a_Color i shaderen!?');
       return -1;
    }
    gl.vertexAttribPointer(posColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}

function triangle(gl)
{
    let triangleV = new Float32Array([1.0, 0.0, 0.0,
        0.975, 0.025, 0.0,
        0.975, -0.025, 0.0,
        0.0, -1.0, 0.0,
        0.025, -0.975, 0.0,
        -0.025, -0.975, 0.0,
        -1.0, 0.0, 0.0,
        -0.975, 0.025, 0.0,
        -0.975, -0.025, 0.0,
        0.0, 1.0, 0.0,
        0.025, 0.975, 0.0,
        -0.025, 0.975, 0.0
    ]);

    let triangleC = new Float32Array([1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0
    ]);

    t = 12;
    //VERTEKSER TIL TRIANGLER
    let trianglePos = gl.createBuffer();
    if (!trianglePos)
    {
        console.log('Fikk ikke laget et bufferobjekt!?');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePos);
    gl.bufferData(gl.ARRAY_BUFFER, triangleV, gl.STATIC_DRAW);
    let triangleAtt = gl.getAttribLocation(gl.program, 'a_Position');
    if (triangleAtt < 0)
    {
        console.log('Fant ikke parametret a_Position i shaderen!?');
        return -1;
    }
    gl.vertexAttribPointer(triangleAtt, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(triangleAtt);

    //FARGE TIL TRIANGLER
    let triangleColorBuffer = gl.createBuffer();
    if(!triangleColorBuffer)
    {
       console.log('Fikk ikke laget et colorBufferobjekt!?')
       return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleC, gl.STATIC_DRAW);
    let trianglePosColor = gl.getAttribLocation(gl.program, 'a_Color');
    if(trianglePosColor < 0)
    {
       console.log('Fant ikke parametret a_Color i shaderen!?');
       return -1;
    }
    gl.vertexAttribPointer(trianglePosColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(trianglePosColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return t;
}

function arrow(gl)
{
    let arrowV = new Float32Array([0.8, 0.0, 0.0,
        0.4, 0.4, 0.0,
        0.4, -0.4, 0.0,
        -0.8, 0.2, 0.0,
        0.6, 0.2, 0.0,
        0.0, -0.2, 0.0,
        -0.8, -0.2, 0.0,
        0.6, -0.2, 0.0,
        0.0, 0.2, 0.0,
        0.6, 0.0, 0.0,
        0.3, 0.2, 0.0,
        0.3, -0.2, 0.0
    ]);

    let arrowC = new Float32Array([0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ]);

    a = 12;
    //VERTEKSER TIL PIL
    let arrowPos = gl.createBuffer();
    if (!arrowPos)
    {
        console.log('Fikk ikke laget et bufferobjekt!?');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, arrowPos);
    gl.bufferData(gl.ARRAY_BUFFER, arrowV, gl.STATIC_DRAW);


    let triAtt = gl.getAttribLocation(gl.program, 'a_Position');
    if (triAtt < 0)
    {
        console.log('Fant ikke parametret a_Position i shaderen!?');
        return -1;
    }
    gl.vertexAttribPointer(triAtt, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(triAtt);

    //FARGE TIL PIL
    let arrowColorBuffer = gl.createBuffer();
    if(!arrowColorBuffer)
    {
        console.log('Fikk ikke laget et colorBufferobjekt!?')
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, arrowColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, arrowC, gl.STATIC_DRAW);
    let arrowPosColor = gl.getAttribLocation(gl.program, 'a_Color');
    if(arrowPosColor < 0)
    {
        console.log('Fant ikke parametret a_Color i shaderen!?');
        return -1;
    }
    gl.vertexAttribPointer(arrowPosColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(arrowPosColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return a;
}
