precision mediump float;

/**
 * definition of a material structure containing common properties
 */
struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec4 emission;
	float shininess;
};

/**
 * definition of the light properties related to material properties
 */
struct Light {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float degrees;
	vec3 direction;
};

//illumination related variables
uniform Material u_material;
uniform Light u_light;
uniform Light u_light2;
varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;
varying vec3 v_light2Vec;
varying vec3 v_spotlight;

uniform bool u_enableAlphaOverride;
uniform float u_alpha;

//texture related variables
uniform bool u_enableObjectTexture;
uniform bool u_enableLight2;
uniform bool u_enableSpotlight;
varying vec2 v_texCoord;
uniform sampler2D u_tex;

vec4 calculateSimplePointLight(Light light, Material material, vec3 lightVec, vec3 normalVec, vec3 eyeVec, vec4 textureColor) {
	lightVec = normalize(lightVec);
	normalVec = normalize(normalVec);
	eyeVec = normalize(eyeVec);

	//compute diffuse term
	float diffuse = max(dot(normalVec,lightVec),0.0);

	//compute specular term
	vec3 reflectVec = reflect(-lightVec,normalVec);
	float spec = pow( max( dot(reflectVec, eyeVec), 0.0) , material.shininess);

    if(u_enableObjectTexture) {
        material.diffuse = textureColor;
        material.ambient = textureColor;
    }

	vec4 c_amb  = clamp(light.ambient * material.ambient, 0.0, 1.0);
	vec4 c_diff = clamp(diffuse * light.diffuse * material.diffuse, 0.0, 1.0);
	vec4 c_spec = clamp(spec * light.specular * material.specular, 0.0, 1.0);
	vec4 c_em   = material.emission;

    return c_amb + c_diff + c_spec + c_em;
}

void main (void) {
    vec4 textureColor = vec4(0,0,0,1);
    if(u_enableObjectTexture) {
        textureColor = texture2D(u_tex,v_texCoord);
    }

	gl_FragColor = calculateSimplePointLight(u_light, u_material, v_lightVec, v_normalVec, v_eyeVec, textureColor);
	if(u_enableLight2) {
	    gl_FragColor += calculateSimplePointLight(u_light2, u_material, v_light2Vec, v_normalVec, v_eyeVec, textureColor) * 0.2;
	}

    if(u_enableSpotlight) {
        vec3 spotlight = normalize(v_spotlight);
        vec3 spotlightDirection = normalize(u_light.direction);

        if(dot(spotlight, -spotlightDirection) > u_light.degrees) {
            float intensity = dot(v_normalVec, spotlight);
            if(intensity > 0.0) {
                gl_FragColor += calculateSimplePointLight(
                    u_light, u_material, v_lightVec, v_normalVec, v_eyeVec, textureColor
                );
            }
        }
    }

    if(u_enableAlphaOverride) {
        gl_FragColor.a = u_alpha;
    }
}
