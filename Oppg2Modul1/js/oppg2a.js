// Vertex shader program.
// Her er point-size fjernet, kun aktuell n�r man tegner punkter.

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
    // Hent <canvas> elementet
    let canvas = document.getElementById('webgl');
    // Rendering context for WebGL, brukes til � kj�re/referere OpenGL-funksjoner/metoder og attributter:
    let gl = canvas.getContext('webgl');
    if (!gl)
    {
        console.log('Fikk ikke tak i rendering context for WebGL');
        return;
    }

    // Initialiser shadere:
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE))
    {
        console.log('Feil ved initialisering av shaderkoden.');
        return;
    }

    //Initialiserer verteksbuffer:
    let noVertexes = initVertexBuffers(gl);

    //Rensker skjermen:
    gl.clearColor(0.0, 7.0, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tegner trekanter:
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 3, 3);
    gl.drawArrays(gl.TRIANGLES, 6, 3);

}

function initVertexBuffers(gl)
{
    //3 stk 2D vertekser:
    let vertices = new Float32Array([1, 1, 0,
        1, 1, 0,
        1, 1, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        0.5,-0.5, 0,
        0.25,0.5, 0,
        -0.25,0.5, 0
    ]);

    let colors = new Float32Array([0.4, 0.2, 0.5, 1.0,
        0.4, 0.2, 0.5, 1.0,
        0.4, 0.2, 0.5, 1.0,
        0.3, 0.7, 0.3, 1.0,
        0.3, 0.7, 0.3, 1.0,
        0.3, 0.7, 0.3, 1.0,
        0.8, 0.3, 0.6, 1.0,
        0.8, 0.3, 0.6, 1.0,
        0.8, 0.3, 0.6, 1.0
    ]);

    let positionBuffer = gl.createBuffer();
    if (!positionBuffer)
    {
        console.log('Fikk ikke laget et bufferobjekt!?');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let colorBuffer = gl.createBuffer();
    if(!colorBuffer)
    {
        console.log('Fikk ikke laget et colorBufferobjekt!?')
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    let posAttrib = gl.getAttribLocation(gl.program, 'a_Position');
    if (posAttrib < 0)
    {
        console.log('Fant ikke parametret a_Position i shaderen!?');
        return -1;
    }
    let floatsPerVertex = 3;
    gl.vertexAttribPointer(posAttrib, floatsPerVertex, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    let posColor = gl.getAttribLocation(gl.program, 'a_Color');
    if(posColor < 0)
    {
        console.log('Fant ikke parametret a_Color i shaderen!?');
        return -1;
    }
    gl.vertexAttribPointer(posColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}