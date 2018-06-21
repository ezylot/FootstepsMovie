attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

uniform mat4 u_modelView;
uniform mat3 u_normalMatrix;
uniform mat4 u_projection;

uniform vec3 u_lightPos;
uniform vec3 u_spotlightPos;
uniform bool u_enableSpotlight;

varying vec3 v_spotlight;
varying vec3 v_normalVec;
varying vec3 v_lightVec;
varying vec3 v_eyeVec;
varying vec2 v_texCoord;

void main() {
	vec4 eyePosition = u_modelView * vec4(a_position,1);

    v_normalVec = u_normalMatrix * a_normal;
    v_eyeVec = -eyePosition.xyz;
	v_lightVec = u_lightPos - eyePosition.xyz;
	v_texCoord = a_texCoord;

    if(u_enableSpotlight) {
        v_spotlight = u_spotlightPos - u_normalMatrix * a_position;
    }

	gl_Position = u_projection * eyePosition;
}
