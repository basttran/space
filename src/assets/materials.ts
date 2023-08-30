import {
  Mesh,
  PBRMaterial,
  Scene,
  StandardMaterial,
  Texture,
} from '@babylonjs/core';
import { MeshAestheticOptions } from './meshes';

type MaterialTexTureType =
  | 'diffuseTexture'
  | 'bumpTexture'
  | 'ambientTexture'
  | 'specularTexture';

type MaterialTextures = Record<MaterialTexTureType, string>;

const TEXTURES_SET_DEFINITIONS = Object.entries({
  diffuseTexture: 'df',
  bumpTexture: 'nl',
  ambientTexture: 'ao',
  specularTexture: 'sp',
} as MaterialTextures);

export const addMaterial = (
  material: MeshAestheticOptions,
  scene: Scene,
  mesh: Mesh
): void => {
  if (!material) {
    return;
  }

  if (typeof material.name !== 'string') {
    let mat = new PBRMaterial(material.name.toHexString(), scene);
    mat.roughness = 1;
    mat.albedoColor = material.name;
    mesh.material = mat;
    return;
  }
  const { name, uvScale } = material;
  let mat = new StandardMaterial(name, scene);
  TEXTURES_SET_DEFINITIONS.forEach((textureDefinition) => {
    const texture = new Texture(
      `${process.env.PUBLIC_URL}/textures/${mat.name}/${mat.name}_${textureDefinition[1]}.jpg`,
      scene
    );
    texture.uScale =
      typeof uvScale === 'number' ? uvScale : uvScale.uScale || 0;
    texture.vScale =
      typeof uvScale === 'number' ? uvScale : uvScale.vScale || 0;

    mat[textureDefinition[0] as MaterialTexTureType] = texture;
  });
  mesh.material = mat;
};
