class CrtAscii {

	constructor( config ) {
		this.destEl = config.destEl;
		this.srcEl = config.srcEl;

		this.chars = '@#$=*!;:~-.  '.split( '' );

		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );

		this.srcEl.addEventListener( 'loadeddata', this.play.bind( this ) );
	}

	play() {
		this.srcDim = {
			width: this.srcEl.videoWidth,
			height: this.srcEl.videoHeight
		};

		this.lineLength = this.srcDim.width;
		this.render();
	}

	render() {
		this.ctx.drawImage( this.srcEl, 0, 0, this.srcDim.width, this.srcDim.height );
		this.imageData = this.ctx.getImageData( 0, 0, this.srcDim.width, this.srcDim.height ).data;

		this.destEl.textContent = this.getAsciiString();

		requestAnimationFrame( this.render.bind( this ) );
	}

	getAsciiString() {
		const asciiLength = this.srcDim.width * this.srcDim.height;
		const data = this.imageData;

		let resultString = '';

		const getRGB = ( x ) => {
			return [
				data[ x *= 4 ],
				data[ x + 1 ],
				data[ x + 2 ]
			];
		};

		const getChar = ( v ) => {
			return this.chars[ parseInt( v * ( this.chars.length - 1 ), 10 ) ];
		};

		for ( let i = 0; i < asciiLength; i++ ) {

			if ( i % this.lineLength === 0 ) {
				resultString += '\n';
			}

			const rgb = getRGB( i );
			const value = Math.max( rgb[ 0 ], rgb[ 1 ], rgb[ 2 ] ) / 255;

			resultString += getChar( value );
		}

		return resultString;
	}
}

module.exports = CrtAscii;
