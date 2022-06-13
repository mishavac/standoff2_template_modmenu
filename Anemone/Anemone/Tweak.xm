#import "Macros.h"
#import "Vector3.h"
#include <OpenGLES/ES3/gl.h>
#include <OpenGLES/ES3/glext.h>
#include "dlfcn.h"

void (*_glDrawElements)(GLenum mode, GLsizei count, GLenum type, const void *indices);
GLint (*_glGetUniformLocation)(GLuint program,const GLchar *name);
GLint $glGetUniformLocation(GLuint program,const GLchar *name)
{
NSLog(@"%s",name);
return _glGetUniformLocation(program,name);
}
//disable metal framework for unity
%hook NSBundle
+ (id)bundleWithPath:(NSString *)fullPath
{
  if ([fullPath isEqual:@"/System/Library/Frameworks/Metal.framework"])
  {
    NSLog(@"distable metal framework");
    return NULL;
  }
  return %orig(fullPath);
}
%end
void $glDrawElements(GLenum mode, GLsizei count, GLenum type, const void *indices) {
    _glDrawElements(mode, count, type, indices);
    if (mode != GL_TRIANGLES || count < 1000) return;{
    GLint currProgram;
    glGetIntegerv(GL_CURRENT_PROGRAM, &currProgram);
    GLint id = _glGetUniformLocation(currProgram, "_BumpMap");
    if (id == -1) return;
    glDepthRangef(0.5, 1); 
    glColorMask(1, 1, 1, 1); 
    glDisable(GL_BLEND); 
}

#define _DRAW_R_ [[switches getValueFromSwitch:@"Red:"] floatValue]
#define _DRAW_G_ [[switches getValueFromSwitch:@"Green:"] floatValue]
#define _DRAW_B_ [[switches getValueFromSwitch:@"Blue:"] floatValue]

if([switches isSwitchOn:@"Set Chams Color"]){
    glDepthRangef(1, 0.5); 
 glBlendColor(GLfloat(_DRAW_R_/30), GLfloat(_DRAW_G_/30), GLfloat(_DRAW_B_/30), 1);
    glColorMask(_DRAW_R_,_DRAW_G_,_DRAW_B_, 0); 
    glEnable(GL_BLEND); 
    glBlendFunc(GL_SRC_ALPHA, GL_ONE); 
    _glDrawElements(mode, count, type, indices); 
    glDepthRangef(0.5, 1); 
    glColorMask(1, 1, 1, 1); 
    glDisable(GL_BLEND); 
}

#define _DRAW_WR_ [[switches getValueFromSwitch:@"WireFrame R:"] floatValue]
#define _DRAW_WG_ [[switches getValueFromSwitch:@"WireFrame G:"] floatValue]
#define _DRAW_WB_ [[switches getValueFromSwitch:@"WireFrame B:"] floatValue]

if([switches isSwitchOn:@"Set WireFrame Color"]){
    glDepthRangef(1, 0.5); 
 glBlendColor(GLfloat(_DRAW_WR_/30), GLfloat(_DRAW_WG_/30), GLfloat(_DRAW_WB_/30), 10);
    glColorMask(_DRAW_WR_,_DRAW_WG_,_DRAW_WB_, 0); 
    glEnable(GL_BLEND);
    glLineWidth( [[switches getValueFromSwitch:@"Width:"] floatValue] ); 
    glBlendFunc(GL_SRC_ALPHA, GL_ONE); 
    _glDrawElements(mode = GL_LINES, count = [[switches getValueFromSwitch:@"Count:"] floatValue], type, indices);
    glDepthRangef(0.5, 1); 
    glColorMask(1, 1, 1, 1); 
    glDisable(GL_BLEND); 

}
}

%ctor {
MSHookFunction((dlsym(RTLD_DEFAULT, "glDrawElements")), (void *)$glDrawElements, (void **)&_glDrawElements);
MSHookFunction((dlsym(RTLD_DEFAULT, "glGetUniformLocation")), (void *)$glGetUniformLocation, (void **)&_glGetUniformLocation);


}


void(*old_weap)(void *instance, int id);
void new_weap(void *instance, int id) {
 if([switches isSwitchOn:@"Set Weapon:"]) {
  id = [[switches getValueFromSwitch:@"Set Weapon:"] intValue];
 }
if([switches isSwitchOn:@"Usp - Genesis"]) {
  id = 12;
 }
if([switches isSwitchOn:@"AWM - Treasure Hunter"]) {
  id = 51;
 }
if([switches isSwitchOn:@"Karambit - Gold"]) {
  id = 72;
 }
if([switches isSwitchOn:@"G22 - Relic"]) {
  id = 11;
 }
if([switches isSwitchOn:@"AWM - Sport V2"]) {
  id = 51;
 }
if([switches isSwitchOn:@"FnFAL - Leather"]) {
  id = 49;
 }
if([switches isSwitchOn:@"M9 Bayonet - Dragon Glass"]) {
  id = 71;
 }
if([switches isSwitchOn:@"Butterfly - Dragon Glass"]) {
  id = 75;
 }
old_weap(instance, id);
}

void(*old_weapupdate)(void *instance, int id);
void new_weapupdate(void *instance, int id) {
 if([switches isSwitchOn:@"Set Weapon:"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"Usp - Genesis"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"AWM - Treasure Hunter"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"Karambit - Gold"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"G22 - Relic"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"AWM - Sport V2"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"FnFAL - Leather"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"M9 Bayonet - Dragon Glass"]) {
  new_weap(instance, id);
 }
if([switches isSwitchOn:@"Butterfly - Dragon Glass"]) {
  new_weap(instance, id);
 }
old_weapupdate(instance, id);
}

void(*old_skin)(void *instance, int id, int skin);
void new_skin(void *instance, int id, int skin) {
 if([switches isSwitchOn:@"Set Skin:"]) {
  skin = [[switches getValueFromSwitch:@"Set Skin:"] intValue];
 }
if([switches isSwitchOn:@"Usp - Genesis"]) {
  skin = 12001;
 }
if([switches isSwitchOn:@"AWM - Treasure Hunter"]) {
  skin = 85104;
 }
if([switches isSwitchOn:@"Karambit - Gold"]) {
  skin = 72003;
 }
if([switches isSwitchOn:@"G22 - Relic"]) {
  skin = 41101;
 }
if([switches isSwitchOn:@"AWM - Sport V2"]) {
  skin = 51006;
 }
if([switches isSwitchOn:@"FnFAL - Leather"]) {
  skin = 44901;
 }
if([switches isSwitchOn:@"M9 Bayonet - Dragon Glass"]) {
  skin = 71005;
 }
if([switches isSwitchOn:@"Butterfly - Dragon Glass"]) {
  skin = 47503;
 }
old_skin(instance, id, skin);
}

int(*old_get_Gloves)(void *this_);
int get_Gloves(void *this_) {

  int userAmount = [[switches getValueFromSwitch:@"Set Gloves:"] intValue];

  if([switches isSwitchOn:@"Set Gloves:"]) {
    return userAmount;
  }
  return old_get_Gloves(this_);
}

void(*old_FirstLookUpdate)(void *instance); 
void FirstLookUpdate(void *instance) { 
 
  float handsFov = [[switches getValueFromSwitch:@"Fov:"]floatValue]; 
 
  if([switches isSwitchOn:@"Fov:"]) { 
   *(float *)((uint64_t) instance + 0x30) = handsFov;
  } 
  return old_FirstLookUpdate(instance); 
}

struct Vector3
{
    float x;
    float y;
    float z;
};

void (*old_b)(void* player, void* config);
void new_b(void* player, void* config){

if([switches isSwitchOn:@"Head Hitbox"]) {
(*(Vector3 *)((uint64_t)config + 0x24)).x += 999999999.0f;
}

if([switches isSwitchOn:@"Body Hitbox"]) {
(*(Vector3 *)((uint64_t)config + 0x24)).y += 999999999.0f;
}
	old_b(player, config);
}

typedef struct Quaternion {
    float x;
    float y;
    float z;
    float w;
} Quaternion;

void (*old_Instantiate)(void* player, unsigned long long a, Vector3 b, Quaternion c, int d, int e, bool f, bool g, float Instantiate);
void new_Instantiate(void* player, unsigned long long a, Vector3 b, Quaternion c, int d, int e, bool f, bool g, float Instantiate) {
if([switches isSwitchOn:@"GodMode"]) {
    Instantiate = 999999999.0f;
old_Instantiate (player, a, b, c, d, e, f, g, Instantiate);
}
else old_Instantiate (player, a, b, c, d, e, f, g, Instantiate);
}

float(*old_get_SpeedDefault)(void *this_);
float get_SpeedDefault(void *this_) {

  float userAmount = [[switches getValueFromSwitch:@"Speed:"] floatValue];

  if([switches isSwitchOn:@"Speed:"]) {
    return userAmount;
  }

return old_get_SpeedDefault(this_);
}

float(*old_Jump)(void *this_);
float Jump(void *this_) {

  float userAmount = [[switches getValueFromSwitch:@"Jump:"] floatValue];

  if([switches isSwitchOn:@"Jump:"]) {
    return userAmount;
  }
return old_Jump(this_);
}

void (*Update1)(void *instance);
void Player_Update1 (void *instance){
if([switches isSwitchOn:@"Set Hands Position"]) {
 if([switches isSwitchOn:@"Hands X:"]) 
 if([switches isSwitchOn:@"Hands Y:"]) 
 if([switches isSwitchOn:@"Hands Z:"]) {
  void *armsdata = *(void **)((uint64_t) instance + 0x70);
  Vector3 hPos;
   hPos.x = [[switches getValueFromSwitch:@"Hands X:"] floatValue] / 100;
   hPos.y = [[switches getValueFromSwitch:@"Hands Y:"] floatValue] / 100;
   hPos.z = [[switches getValueFromSwitch:@"Hands Z:"] floatValue] / 100;
  *(Vector3 *)((uint64_t)armsdata + 0xE8) = hPos;

}
} 
}

void (*old_fly)(void* player, Vector3 b);
void new_fly(void* player, Vector3 b){
if([switches isSwitchOn:@"Custom Fly:"]){
  b.y= [[switches getValueFromSwitch:@"Custom Fly:"] intValue];
}
return old_fly(player, b);
}

int(*old_kills)(void *_this);

int kills(void *_this){

int userAmount = [[switches getValueFromSwitch:@"Kills:"] intValue];

  if([switches isSwitchOn:@"Kills:"]) {
    return userAmount;
  }

return old_kills(_this);
}

int(*old_Assists)(void *_this);

int Assists(void *_this){

int userAmount = [[switches getValueFromSwitch:@"Assists:"] intValue];

  if([switches isSwitchOn:@"Assists:"]) {
    return userAmount;
  }

return old_Assists(_this);
}

int(*old_Death)(void *_this);

int Death(void *_this){

int userAmount = [[switches getValueFromSwitch:@"Death:"] intValue];

  if([switches isSwitchOn:@"Death:"]) {
    return userAmount;
  }

return old_Death(_this);
}

int(*old_Score)(void *_this);

int Score(void *_this){

int userAmount = [[switches getValueFromSwitch:@"Score:"] intValue];

  if([switches isSwitchOn:@"Score:"]) {
    return userAmount;
  }

return old_Score(_this);
}

int(*old_Ping)(void *_this);

int Ping(void *_this){

int userAmount = [[switches getValueFromSwitch:@"Ping:"] intValue];

  if([switches isSwitchOn:@"Ping:"]) {
    return userAmount;
  }

return old_Ping(_this);
}

int(*old_Mvp)(void *_this);

int Mvp(void *_this){

int userAmount = [[switches getValueFromSwitch:@"MVP:"] intValue];

  if([switches isSwitchOn:@"MVP:"]) {
    return userAmount;
  }

return old_Mvp(_this);
}


void setup() {

HOOK(0x1c0b3b0, new_weap, old_weap); 

HOOK(0x1c125b4, new_weapupdate, old_weapupdate); 

HOOK(0x18cc530, new_skin, old_skin);

HOOK(0x1ac3754, get_Gloves, old_get_Gloves);

HOOK(0x18b7e14, FirstLookUpdate, old_FirstLookUpdate);

HOOK(0x1a0c2c8, new_b, old_b);

HOOK(0x1a1d650, new_Instantiate, old_Instantiate);

HOOK(0x1a161d4, get_SpeedDefault, old_get_SpeedDefault);

HOOK(0x1aa58d4, Jump, old_Jump);

HOOK(0x1a1915c, Player_Update1,Update1);

HOOK(0x2690fd0, new_fly, old_fly);

HOOK(0x1ab96c8, kills, old_kills);

HOOK(0x1ab995c, Assists, old_Assists);

HOOK(0x1ab9bf0, Death, old_Death);

HOOK(0x1ab94cc, Score, old_Score);

HOOK(0x1ab8d94, Ping, old_Ping);

HOOK(0x1ab954c, Mvp, old_Mvp);

patchOffset(0x1a1932c, "0xC0035FD6");
patchOffset(0x18747b8, "0xC0035FD6");
patchOffset(0x187537c, "0xC0035FD6");
patchOffset(0x1874b8c, "0xC0035FD6");
patchOffset(0x1874604, "0xC0035FD6");
patchOffset(0x1874a88, "0xC0035FD6");
patchOffset(0x18743c4, "0xC0035FD6");
patchOffset(0x1874c64, "0xC0035FD6");
patchOffset(0x18741ac, "0xC0035FD6");
patchOffset(0x1874d4c, "0xC0035FD6");
patchOffset(0x18749b4, "0xC0035FD6");
patchOffset(0x1874708, "0xC0035FD6");
patchOffset(0x1875170, "0xC0035FD6");
patchOffset(0x1874ffc, "0xC0035FD6");
patchOffset(0x18744ac, "0xC0035FD6");
patchOffset(0x187489c, "0xC0035FD6");
patchOffset(0x1874e68, "0xC0035FD6");
patchOffset(0x1bbe990, "0xC0035FD6");


 [switches addOffsetSwitch2:@"No Recoil"
              description:@"No Recoil"
                offsets:{0x18ccca4}
                  bytes:{"0xC0035FD6"}];

 [switches addSliderSwitch3:@"Fov:"
            description:@"Fov"
              minimumValue:0
                maximumValue:150
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addSwitch4:@"Usp - Genesis"
            description:@"Usp - Genesis"];

 [switches addSwitch:@"GodMode"
            description:@"GodMode"];

 [switches addOffsetSwitch2:@"No Camera Recoil"
              description:@"No Camera Recoil"
                offsets:{0x18ceb18}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addTextfieldSwitch3:@"Set Gloves:"
            description:@"Set your custom gloves"
              inputBorderColor:UIColorFromHex(0x7000E8)];

 [switches addSwitch4:@"AWM - Treasure Hunter"
            description:@"AWM - Treasure Hunter"];

 [switches addSliderSwitch:@"Speed:"
            description:@"Speed"
              minimumValue:0
                maximumValue:40
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch2:@"Shoot Through Walls"
              description:@"Shoot Through Walls"
                offsets:{0x1adc554}
                  bytes:{"0x00F0271EC0035FD6"}];

 [switches addOffsetSwitch3:@"Fps Hack"
              description:@"Fps Hack"
                offsets:{0x19901bc}
                  bytes:{"0x200080D2C0035FD6"}];

 [switches addSwitch4:@"Karambit - Gold"
            description:@"Karamdit - Gold"];

 [switches addOffsetSwitch:@"Move Before Time"
              description:@"Move Before Time"
                offsets:{0x1c0fbb8}
                  bytes:{"0x00008052C0035FD6"}];

 [switches addTextfieldSwitch2:@"Set Weapon:"
              description:@"Set Weapon"
                inputBorderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch3:@"Always Arcane"
              description:@"Always Arcane"
                offsets:{0x194549c,0x19405e8,0x1ad26e8}
                  bytes:{"0xC00080D2C0035FD6","0xC00080D2C0035FD6","0xC00080D2C0035FD6"}];

 [switches addSwitch4:@"G22 - Relic"
            description:@"G22 - Relic"];

 [switches addOffsetSwitch:@"Don't Return To Spawn"
              description:@"Don't Return To Spawn"
                offsets:{0x1c10ac0}
                  bytes:{"0x00008052C0035FD6"}];

 [switches addTextfieldSwitch2:@"Set Skin:"
              description:@""
                inputBorderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch3:@"Always StatTrack"
              description:@"Always StatTrack"
                offsets:{0x193b47c,0x1ad3550}
                  bytes:{"0x20008052C0035FD6","0x20008052C0035FD6"}];

 [switches addSwitch4:@"AWM - Sport V2"
            description:@"AWM - Sport V2"];

 [switches addOffsetSwitch:@"Play MM no 5lvl"
              description:@"Play MM no 5lvl"
                offsets:{0x194532c}
                  bytes:{"0x200080D2C0035FD6"}];

 [switches addSwitch2:@"Head Hitbox"
            description:@"Head Hitbox"];

 [switches addSwitch3:@"Set WireFrame Color"
            description:@"Enemies will become visible through walls. Use medium graphics settings"];

 [switches addSwitch4:@"FnFAL - Leather"
            description:@"FnFAL - Leather"];

 [switches addOffsetSwitch:@"Radar Hack"
              description:@"Radar Hack"
                offsets:{0x1c30d44}
                  bytes:{"0x200080D2C0035FD6"}];

 [switches addSwitch2:@"Body Hitbox"
            description:@"Body Hitbox"];

 [switches addSliderSwitch3:@"WireFrame R:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addSwitch4:@"M9 Bayonet - Dragon Glass"
            description:@"M9 Bayonet - Dragon Glass"];

 [switches addOffsetSwitch:@"Team Radar"
              description:@"You Have To Look Towards Opponents"
                offsets:{0x19db5d8, 0x1c30d44}
                  bytes:{"0xC0035FD6","0x20008052C0035FD6"}];

 [switches addOffsetSwitch2:@"OneHitKill"
              description:@"OneHittKill"
                offsets:{0x1ac67d4, 0x1ac6b24, 0x1ac6b04, 0x1ac67b4}
                  bytes:{"0xE003271EC0035FD6", "0xE003271EC0035FD6", "0xE003271EC0035FD6", "0xE003271EC0035FD6"}];

 [switches addSliderSwitch3:@"WireFrame G:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addSwitch4:@"Butterfly - Dragon Glass"
            description:@"Butterfly - Dragon Glass"];

 [switches addOffsetSwitch:@"Float"
              description:@"Float"
                offsets:{0x1a168e4}
                  bytes:{"0xC0035FD6"}];

 [switches addOffsetSwitch2:@"Unlimited Ammo"
              description:@"Unlimited Ammo"
                offsets:{0x1ad45ec,0x1ad459c}
                  bytes: {"0xE0E184D2C0035FD6","0xE0E184D2C0035FD6"}];

 [switches addSliderSwitch3:@"WireFrame B:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Plant Anywhere"
              description:@"Plant Anywhere"
                offsets:{0x18b5e14,0x18b5db0,0x18b5dec}
                  bytes:{"0x20008052C0035FD6", "0x20008052C0035FD6", "0x20008052C0035FD6"}];  

 [switches addOffsetSwitch2:@"Fire Rate"
              description:@"Fire Rate"
                offsets:{0x18cde30}
                  bytes:{"0xC0035FD6"}];

 [switches addSliderSwitch3:@"Count:"
            description:@"Set your custom wireframe count"
              minimumValue:100
                maximumValue:6000
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Bomb Immunity"
              description:@"Bomb Immunity"
                offsets:{0x18b26ec}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addOffsetSwitch2:@"No Shooting Sounds"
              description:@"No Shooting Sounds"
                offsets:{0x18cc2d8}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addSliderSwitch3:@"Width:"
            description:@"Set your custom wireframe count"
              minimumValue:1
                maximumValue:20
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Bomb Explodes"
              description:@"Bomb Explodes"
                offsets:{0x18b2e88}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addOffsetSwitch2:@"Friendly Fire"
              description:@"Friendly Fire"
                offsets:{0x1a0d0d4}
                  bytes:{"0x200080D2C0035FD6"}];

 [switches addSwitch3:@"Set Chams Color"
            description:@"Enemies will become visible through walls. Use medium graphics settings"];

 [switches addOffsetSwitch:@"Fast Plant"
              description:@"Fast Plant"
                offsets:{0x18b07b0}
                  bytes:{"0xE003271EC0035FD6"}];

 [switches addOffsetSwitch2:@"Arm Race Win"
              description:@"Arm Race Win"
                offsets:{0x1b5454c}
                  bytes:{"0xE00180D2C0035FD6"}];

 [switches addSliderSwitch3:@"Red:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Buy Anywhere"
              description:@"Buy Anywhere"
                offsets:{0x1c04d94,0x1c041d8}
                  bytes:{"0x20008052C0035FD6","0x20008052C0035FD6"}];

 [switches addOffsetSwitch2:@"No Drop Weapon"
              description:@"No Drop Weapon"
                offsets:{0x1a36e8c,0x1a357e8}
                  bytes:{"0x200080D2C0035FD6","0x200080D2C0035FD6"}];

 [switches addSliderSwitch3:@"Green:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Anti Flash"
              description:@"Anti Flash"
                offsets:{0x18c17d8}
                  bytes:{"0xC0035FD6"}];

 [switches addOffsetSwitch2:@"Drop Knife"
              description:@"No Drop Weapon"
                offsets:{0x18d43b8}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addSliderSwitch3:@"Blue:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:1
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"He Immunity"
              description:@"He Immunity"
                offsets:{0x18c4c3c}
                  bytes:{"0xC0035FD6"}];

 [switches addSwitch3:@"Set Hands Position"
            description:@"Set your custom hands pos"];

 [switches addOffsetSwitch:@"Fast Grenade"
              description:@"Fast Grenade"
                offsets:{0x18c0bac}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addSliderSwitch3:@"Hands X:"
            description:@"Set your custom hands pos"
              minimumValue:-100
                maximumValue:100
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"No Grenade"
              description:@"No Grenade"
                offsets:{0x18c5c30}
                  bytes:{"0xC0035FD6"}];

 [switches addSliderSwitch3:@"Hands Y:"
            description:@"Set your custom hands pos"
              minimumValue:-100
                maximumValue:100
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"No Grenade Sounds"
              description:@"No Grenade Sounds"
                offsets:{0x18bec98}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addSliderSwitch3:@"Hands Z:"
            description:@"Set your custom hands pos"
              minimumValue:-100
                maximumValue:100
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Infinity Jump"
              description:@"Infinity Jump"
                offsets:{0x2691128}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addOffsetSwitch3:@"Hide Avatar"
              description:@"Hide Avatar"
                offsets:{0x1ab9c70}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addOffsetSwitch:@"Long Jump"
              description:@"Long Jump"
                offsets:{0x1aa58d4}
                  bytes:{"0x00F0271EC0035FD6"}];

 [switches addSliderSwitch:@"Jump:"
            description:@"Set your custom jump"
              minimumValue:0
                maximumValue:150
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addSliderSwitch:@"Custom Fly:"
            description:@"Enemies will become visible through walls. Use medium graphics settings"
              minimumValue:0
                maximumValue:100
                  sliderColor:UIColorFromHex(0x7000E8)];

 [switches addOffsetSwitch:@"Money"
              description:@"Money"
                offsets:{0x1c11e88}
                  bytes:{"0x00008052C0035FD6"}];

 [switches addOffsetSwitch:@"Medal Hack"
              description:@"Medal Hack"
                offsets:{0x1a39e84}
                  bytes:{"0x200080D2C0035FD6"}];

 [switches addOffsetSwitch:@"Always Respawn"
              description:@"Always Respawn"
                offsets:{0x1c027f8}
                  bytes:{"0x20008052C0035FD6"}];

 [switches addTextfieldSwitch:@"Kills:"
            description:@"Set your custom kills"
              inputBorderColor:UIColorFromHex(0x7000E8)];

[switches addTextfieldSwitch:@"Assists:"
            description:@"Set your custom assists"
              inputBorderColor:UIColorFromHex(0x7000E8)];

 [switches addTextfieldSwitch:@"Death:"
            description:@"Set your custom death"
              inputBorderColor:UIColorFromHex(0x7000E8)];

 [switches addTextfieldSwitch:@"Ping:"
            description:@"Set your custom ping"
              inputBorderColor:UIColorFromHex(0x7000E8)];

[switches addTextfieldSwitch:@"Score:"
            description:@"Set your custom score"
              inputBorderColor:UIColorFromHex(0x7000E8)];

[switches addTextfieldSwitch:@"MVP:"
            description:@"Set your custom mvp"
              inputBorderColor:UIColorFromHex(0x7000E8)];

}

void setupMenu() {


[menu setFrameworkName:"UnityFramework"];
menu = [[Menu alloc]              initWithTitle:@"Anemone"
watermarkText:@"Telegram - @anemonehack"
watermarkTextColor:UIColorFromHex(0xc72c36)
watermarkVisible:1.0
titleColor:[UIColor whiteColor]
titleFont:@"Avenir-Black"
credits:@"Anemone Team"
initWithTitle:@"By Anemone Team"
titleColor:[UIColor whiteColor]
titleFont:@"Avenir-Black"
initWithTitle:@"v0.17.4"
titleColor:[UIColor whiteColor]
titleFont:@"Avenir-Black"
headerColor:[UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.7]
switchOffColor:[UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.5]
switchOnColor:UIColorFromHex(0x000000)
switchTitleFont:@"AppleSDGothicNeo-Bold"
switchTitleColor:[UIColor whiteColor]
infoButtonColor:[UIColor clearColor]
maxVisibleSwitches:5
menuWidth:500
menuIcon:@""
menuButton:@"iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABkKADAAQAAAABAAABkAAAAAAbMW/MAAAAHGlET1QAAAACAAAAAAAAAMgAAAAoAAAAyAAAAMgAAE1yG3F1hQAAQABJREFUeAHs3Ye/bUdVB3D+J3vBqBGN2MCIIihBUVEJGiIIKuYZMSIEsSKi4ENRsSsoxVAeYMEuir3k2nvv/Xi+J/mFlXm7nXvvy3shaz6fc3e5e6+Z+e1zfmtWmdkPe1iXRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFNCDz84Q/ffcRHfMTuYz/2Y3cf/uEfvtt0U1/UCDQCjUAj0Ag87nGP233mZ37m7vM+7/MO20akEWgEGoFGoBFYRODWW2/dfc3XfM3u937v93Z/+Zd/eficnJzsvuu7vmv3VV/1Vde8JXLjjTfuPuuzPmv39V//9btv+IZv2D35yU/efcInfMI13+7Fh9L/bAQagUbgwYDAC17wgt33f//37/75n/95p/zv//7v7l//9V93b3vb23aveMUrzp2IP+ADPmD3wR/8wbsP+qAP2r3P+7zPmeXfcsstuzvuuGP3qle96vB57nOfu3va0552ZrkPhmfXbWwEGoFG4NwQuP766w8k+lM/9VO7d7zjHbuf/MmfPLiklkbkb3/723d/9md/tvuf//mfgwL5v//7v4MS+fd///fd7/zO75wbET/lKU/ZIfff/M3f3P3Jn/zJ4fPOd75zRwEstW8OnC/4gi/Yfe3Xfu3uD/7gD3Z/93d/d1B6FJ/93/7t39496UlP6ljOHHh9vhFoBBqBisB11123e/zjH7/75V/+5QM5//3f//3uj/7oj3YvfOELDyRdr637v/iLv7j7m7/5m4PSoEEoEB/lj//4j3cshnr9afe/8iu/8uAWi6VDvjaygJ761KceXQfl8YM/+IO7f/mXfyHqfuWv//qvdxTMaRTTafvX9zUCjUAjcM0g8Omf/ukHV8xznvOc3Rd/8RevEuxLXvKS3etf//rdP/7jP+7++7//+6AQbI3If+VXfmX2/h//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DXGSK5UlI2jOLaaEuEIoSB6ZZsb0aUeiAsg33njjwdKK8qgKxDluKEH8YwhS2nN1BaXdtvqkb8csJuitimROKRBKYS6WIoiv/ekTxav+tewvz1zsilKtFmh9Dva1h3zfBW600371pGezAj1PVlueRcXNvvb7pESZyNh64xvfeGgHq1ViAkV42vb0fdc2Av8PAAD//6anGHwAADWMSURBVO2diZsUxfnH/Z9EkFuQQ/IDRQS5lEtEORQQReUQEUQONQIiRJD7EhVUbgERQQQjoKgcYlhFg0k0IQkxd1K/+VR89ymL7p2enZllZvdbzzPb0z3ddXyr933rPeuaa1SEQAICffr0cQ888ID7/PPP3e9//3v3n//8x1H++9//+o99//vf/+6++uorN3DgQNe2bVuXUFWmS4sXL3Y7duxwP/zwg2/H/tDeP//5T/fll1+6d999N3P9PXr0cGPGjHEXL150//rXv6w6Pw7G8o9//MPV1NS4zp07Z66Tgbz66qvul7/8pWPclBAP2rr55puvqK9Tp07u/Pnz/hna5hnKv//9b/ftt9+6Dz744IpnQtDA9a233nKffvqpr8Oe95X8+Ie6wOkPf/iDu3Dhgnv55Zfds88+W2e9YRvx9zvvvNM98sgj7uzZs+7777/3fU1qN+wDv4PLX//6V//M7373O/frX//aff311x5r3qW3337bz/OKFSvckiVL3Ny5c92TTz7pHn30Uffwww+7cePG+XkbMGCA6969e737H49H50JACDQgAuPHj3c///nP3aVLl2oJHsQCImEfCBbE4ciRI65du3ZF/bNv2bLFHTt2rJYwG2Girb/97W/+t82bN2duY8SIEZ4wQVDDAgGHoTCuTz75xF133XWZ6wR++nn8+HHPgKjXsOA7DORnP/vZFfV16dLFE1CYVng/32GY586dcx07drziuXC6ly5d6nbt2uUgyn/5y198PbRphXHxoYDX4cOH3WuvveZoO6wn6/f27du7fv36uX379rmTJ0+67777zv3pT3/ybdDvfMX6Y+PlnPH/6le/cp999plnJDt37vSMbu3atZ6ZLFq0yD333HPu6aef9sxr1KhR9ep71jHqPiEgBEqMwB133OFXg/yjQ2RZ2YYEg+8QAwgfUsG9996bSDSzdgtCxWqXVTOrV9ozQgiRgtj/5je/cRMmTHC9e/fOTFBY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/qy/56s33+/WTnxffG73MV5wQb2Fmgu8kC6Q7HDVDVV5SE/E3WA3wmb01FNPuUGDBsm7zV5GHYWAEKhuBNjhDoPzuHHjvA4e6QR3VFRJqL2MiXC07xBTU+kYYU07GiFOuz/tuj1nx3z1x/dZvXaMf4/PrX67nsQYqcvcarHFYJthq1hS8OPOS94yIvxxf1aAZnX/X6j3QkAIFIAAEdOsjlklEwuCMdu22cX2gOuqSSoWFIch3SQWMzobozFCbEcj5Eao7Zh23Z6zo90fH+13q8cIv0kI9AvDOC62fHAC4INNho85AyBBIIGZQwBjZczYKvjATJEocEogSaUxDhwVpk+f7oYPH+4GDBgg1VQB75xuFQJCoIkggP2EeASMvZMmTfIqmWXLljmM9Oj3ze0VIouRHMYC4YbAU4zQ29EYgZ3b0a7HR/vdjuHvXINhwCBgAHheYYTHGP/RRx95oo8qCWcC+kpA3tq1a92KXLwHNqFnnnnGMwGi+0eOHOmZAW7JjJmIfHlFNZGXXMMUAkKgPAgQjEc8AunHYSRsXIVBmKBC9PsWeAeRxk0XN1tL58Hq3T6xmy2r/PDDyj/82G8mCSANhR/qxY5DsCNqNyLzcRXGBRh34DfeeMNt3rzZx3ksX77cLVq0yLvMEm2P5ABDxKhNjAjR9+z+17lzZ78hE2MuD5qqVQgIASEgBApGAJsLgYYkAcQzDGJN7AN5pexDdlmixvlwH8GJMC88l2RbKBhyPSAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkLgpwj8P96pfYSfGu+CAAAAAElFTkSuQmCC"]; 

    setup();
}


static void didFinishLaunching(CFNotificationCenterRef center, void *observer, CFStringRef name, const void *object, CFDictionaryRef info) {

    NSUserDefaults *check;
check = [NSUserDefaults standardUserDefaults];

timer(5) {

SCLAlertView *alert = [[SCLAlertView alloc] initWithNewWindowWidth:250];

alert.customViewColor = UIColorFromHex(0x7000E8);
alert.showAnimationType = SCLAlertViewShowAnimationSlideInFromCenter;
alert.hideAnimationType = SCLAlertViewHideAnimationFadeOut;
alert.shouldDismissOnTapOutside = NO;
alert.backgroundType = SCLAlertViewBackgroundBlur;
alert.cornerRadius = 10.0f;
alert.backgroundViewColor = [UIColor colorWithRed:0.00 green:0.00 blue:0.00 alpha:1.00];

SCLAlertView *bad = [[SCLAlertView alloc] initWithNewWindowWidth:300];

bad.customViewColor = UIColorFromHex(0x7000E8);
bad.showAnimationType = SCLAlertViewShowAnimationSlideInFromCenter;
alert.hideAnimationType = SCLAlertViewHideAnimationFadeOut;
bad.shouldDismissOnTapOutside = NO;
bad.backgroundType = SCLAlertViewBackgroundBlur;
bad.cornerRadius = 10.0f;
bad.backgroundViewColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:1.0];

SCLAlertView *nice = [[SCLAlertView alloc] initWithNewWindowWidth:250];

nice.customViewColor = UIColorFromHex(0x7000E8);
nice.showAnimationType = SCLAlertViewShowAnimationSlideInFromCenter;
alert.hideAnimationType = SCLAlertViewHideAnimationFadeOut;
nice.shouldDismissOnTapOutside = NO;
nice.backgroundType = SCLAlertViewBackgroundBlur;
nice.cornerRadius = 10.0f;
nice.backgroundViewColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:1.0];

[nice addButton: @"Anemone" validationBlock: ^BOOL {
[[UIApplication sharedApplication] openURL: [NSURL URLWithString:@"https://discord.gg/qnFA9tgttX"]];
BOOL shouldClosePopup = false;
return shouldClosePopup;
} actionBlock:^{}];
    [nice addButton: @"Thanks:3" actionBlock: ^(void) {
      timer(1) {
        setupMenu();
      });
    }];    


NSString *loggedin = [check stringForKey:@"loggedin"];
timer(1) {
if([loggedin isEqualToString:@"1"]) {
[nice showSuccess:@"Anemone" subTitle:@"\n Anemone Hack By Anemone Team" closeButtonTitle:nil duration:999999999.0f];
[nice.view setTintColor:[UIColor yellowColor]];

}
});

UITextField *text1 = [alert addTextField:@"Password"];

[alert addButton: @"Discord" validationBlock: ^BOOL {
[[UIApplication sharedApplication] openURL: [NSURL URLWithString:@"https://discord.gg/qnFA9tgttX"]];
BOOL shouldClosePopup = false;
return shouldClosePopup;
} actionBlock:^{}];

[alert addButton:@"Unlock" actionBlock:^ (void) {
if ([text1.text isEqualToString:@"6398480454398374"]) {
[check setObject:@"1" forKey:@"1"];
[check synchronize];
timer(1) {
[nice showSuccess:@"Success" subTitle:@"hehe" closeButtonTitle:nil duration:999999999.0f];
});
}
else
{
timer(1) {
[bad showError:@"Wrong Password:(" subTitle:@"\n Game will crash now. \n After that you can try again" closeButtonTitle:nil duration:999999999.0f];
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
exit(0);
});
});
}
}];

if(![loggedin isEqualToString:@"1"]) {
NSData* data = [[NSData alloc] initWithBase64EncodedString:@"iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABkKADAAQAAAABAAABkAAAAAAbMW/MAAAAHGlET1QAAAACAAAAAAAAAMgAAAAoAAAAyAAAAMgAAE1yG3F1hQAAQABJREFUeAHs3Ye/bUdVB3D+J3vBqBGN2MCIIihBUVEJGiIIKuYZMSIEsSKi4ENRsSsoxVAeYMEuir3k2nvv/Xi+J/mFlXm7nXvvy3shaz6fc3e5e6+Z+e1zfmtWmdkPe1iXRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFGoBFoBBqBRqARaAQagUagEWgEGoFNCDz84Q/ffcRHfMTuYz/2Y3cf/uEfvtt0U1/UCDQCjUAj0Ag87nGP233mZ37m7vM+7/MO20akEWgEGoFGoBFYRODWW2/dfc3XfM3u937v93Z/+Zd/eficnJzsvuu7vmv3VV/1Vde8JXLjjTfuPuuzPmv39V//9btv+IZv2D35yU/efcInfMI13+7Fh9L/bAQagUbgwYDAC17wgt33f//37/75n/95p/zv//7v7l//9V93b3vb23aveMUrzp2IP+ADPmD3wR/8wbsP+qAP2r3P+7zPmeXfcsstuzvuuGP3qle96vB57nOfu3va0552ZrkPhmfXbWwEGoFG4NwQuP766w8k+lM/9VO7d7zjHbuf/MmfPLiklkbkb3/723d/9md/tvuf//mfgwL5v//7v4MS+fd///fd7/zO75wbET/lKU/ZIfff/M3f3P3Jn/zJ4fPOd75zRwEstW8OnC/4gi/Yfe3Xfu3uD/7gD3Z/93d/d1B6FJ/93/7t39496UlP6ljOHHh9vhFoBBqBisB11123e/zjH7/75V/+5QM5//3f//3uj/7oj3YvfOELDyRdr637v/iLv7j7m7/5m4PSoEEoEB/lj//4j3cshnr9afe/8iu/8uAWi6VDvjaygJ761KceXQfl8YM/+IO7f/mXfyHqfuWv//qvdxTMaRTTafvX9zUCjUAjcM0g8Omf/ukHV8xznvOc3Rd/8RevEuxLXvKS3etf//rdP/7jP+7++7//+6AQbI3If+VXfmX2/h//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DXGSK5UlI2jOLaaEuEIoSB6ZZsb0aUeiAsg33njjwdKK8qgKxDluKEH8YwhS2nN1BaXdtvqkb8csJuitimROKRBKYS6WIoiv/ekTxav+tewvz1zsilKtFmh9Dva1h3zfBW600371pGezAj1PVlueRcXNvvb7pESZyNh64xvfeGgHq1ViAkV42vb0fdc2Av8PAAD//6anGHwAADWMSURBVO2diZsUxfnH/Z9EkFuQQ/IDRQS5lEtEORQQReUQEUQONQIiRJD7EhVUbgERQQQjoKgcYlhFg0k0IQkxd1K/+VR89ymL7p2enZllZvdbzzPb0z3ddXyr933rPeuaa1SEQAICffr0cQ888ID7/PPP3e9//3v3n//8x1H++9//+o99//vf/+6++uorN3DgQNe2bVuXUFWmS4sXL3Y7duxwP/zwg2/H/tDeP//5T/fll1+6d999N3P9PXr0cGPGjHEXL150//rXv6w6Pw7G8o9//MPV1NS4zp07Z66Tgbz66qvul7/8pWPclBAP2rr55puvqK9Tp07u/Pnz/hna5hnKv//9b/ftt9+6Dz744IpnQtDA9a233nKffvqpr8Oe95X8+Ie6wOkPf/iDu3Dhgnv55Zfds88+W2e9YRvx9zvvvNM98sgj7uzZs+7777/3fU1qN+wDv4PLX//6V//M7373O/frX//aff311x5r3qW3337bz/OKFSvckiVL3Ny5c92TTz7pHn30Uffwww+7cePG+XkbMGCA6969e737H49H50JACDQgAuPHj3c///nP3aVLl2oJHsQCImEfCBbE4ciRI65du3ZF/bNv2bLFHTt2rJYwG2Girb/97W/+t82bN2duY8SIEZ4wQVDDAgGHoTCuTz75xF133XWZ6wR++nn8+HHPgKjXsOA7DORnP/vZFfV16dLFE1CYVng/32GY586dcx07drziuXC6ly5d6nbt2uUgyn/5y198PbRphXHxoYDX4cOH3WuvveZoO6wn6/f27du7fv36uX379rmTJ0+67777zv3pT3/ybdDvfMX6Y+PlnPH/6le/cp999plnJDt37vSMbu3atZ6ZLFq0yD333HPu6aef9sxr1KhR9ep71jHqPiEgBEqMwB133OFXg/yjQ2RZ2YYEg+8QAwgfUsG9996bSDSzdgtCxWqXVTOrV9ozQgiRgtj/5je/cRMmTHC9e/fOTFBY6X7xxRd+VR4TOwjwm2++6RYuXJi5PhvPnj17vFRmzMDqBpdvvvkmlWB/9NFHXjoIx8azjBcm98ILL/gVuLWTdoSRQHhNUjMCbUfq5DtM5PLly545IeEgTYBzWr11XW/ZsqWbN2+eg9AzF0kMjHYpjIdPWmHRAXb0D0mFPvKBOf3xj3/0H947pJ6anITIHE2cOLFe/a5rTPpNCAiBMiCAKgFixj80JSRMnNtKEoJ/9OhR93//939F/XP379/fEzcIhtVvRJa2IVYwMxhbVimnVatW7uOPP/ZEyOrylef+UCeECvUJYy0UQhgT/YEQUpcVvsNAbrzxxsQ633nnHa/GCtVpPEv//vznPzukKyS+fP2ZOnWqe/HFFz3zhvFQH3XQftgf6uYcRoOajDmdMmVK3vrT2kcdiKoJ9Z2ptXhHYPpgYSUfA7H7shyZe1SGzzzzTL37nTYeXRcCQqCECLBCRYUAY4DAGuE1wmRHCAZ6bSQC7CTFdgHCCkFmVWptQlz4zgoVtRZqo6ztPPTQQ+7555+vXe2HBM0IKrr4Dh06ZK4zbBumySo8aZWNOo/Veni/fUcdM2fOHC/VxcSTsWJnguk1a9Ys8Xmrx46jR492Tz31lFebsZpnbIZbiCPX6Sv1M2/vvfeee/311700V1+b1fXXX++Z0YIFC7w6D0nPGKO9J/SBj53bMR67nfO81WHXYEynT5/2qjsbt45CQAhUIAKsUFHrmGrE/ontHx9iwD80RAgbwO233+5Y6RczFPTzp06d8gzLVtLWLkSPlTmGdQzsWdthFY/un9UrJWQgfMdOARPIWl9834cffujtASGRtj7DQNIYQK9evRx2JaSBmFCCMYz5fM7QntWoj5MA6kPUUzzHeKnDCLf1yY60CaNhgXDixAm/AMBQHY8v6znqMBYRMHekMtSZYIutBGaFWop3iXeGtu09sv7ER+6JceFZ3g9Udln7pfuEgBBoQAReeuklv8JjVQ3BtlVj+A/OPz/EAOKDZ1YpJA90+XgWQfhiYkx7ELuanA78tttuy2zoxmsH6QLiRR2UkHAhWSFlFaNTp36TluJ+442Wb+pgXhBaiKNhbX1E95/VFmLtwLBQI8JoYewwkXDcVre/mPsDkab/EHqIPioi7AzXXntt3r5bm0lHpBkcCFALzp49223bts0hXfLOYPiHeYcl7pf9Fl7n3XjllVe8UT2pTV0TAkLgKiLAP/zevXu9eygEOyRo9g/NNQgOxAbiB/MoVvJgyHgU4ZZK3XGB2Pz2t7/1BDGrmgVp5u677/bPhfUZQYJwUuekSZO8y3F9YUfdRv/AhY8V2qnJMbx89ULo8UIyacH6Rz0QzKy2kLgdGA+qKeww2EZgUPQzrN/6akf6wJwieSIhtWnTJm//43bjc6SakSNHeka9evVq73qN3QRsYCYwT6QwFizMB9IKH5gnH/rOBwaHZIWaDLVk3I7OhYAQuAoIsKK///77vTGUf2okiyQiDuGBQGIoRceNW2y3bt2K/kfGDrBx40Zv4LbVshE0OyIpFLoSR22FesnsASHhhHnAAA8ePFh0/yGCcaEtiD+MId+UwuRmzpzpiWRYD1jTT4gpHlv56kn7HeI9Y8YMP17mzpiItRXiwnfmgHcA9RsMfdasWQ77Slr9xV5HWoJZgQN2IWI/MO4TD4L7Lt5eSDBIiffcc0/Z+lHsOPS8EGiSCKCC4h+VFSDEAyKSVCBmGLGJUSCA76abbir6nxk1yYYNGzwhp+64bc5hANhZkBTwvMo6SYcOHfIBjay8qcc+jI1xsgpGXZO1vqT76H8SAzFGS7xE0nPhNQtwjG0h1MGHviLl1NfID4HGNgIzM9VRiHOISzjvzDcSAK66EPPmzZvnHUs4rkK+o3bD1oMEjBce9hSY1n333eeDCGGCffv2Lco9vJD+6F4hIARSEBg8eLB78MEHHfELEFEYB4QiXpmGxITfUDVgbCX2Is2zKKXJxMtma2GFbVICbYYEjetICevXr89MvCA2rFhRh8A8kgq/seKtb1CdDeiGG27wKiLaMILPd/BCdYSHk92b70jwJYwSwh0TeFQ4EPFiJAHUUkgySdKl9dneAWufMfFu8I4gzaFuK4XUmQ8L/S4EhECFIdCiRQu/ynvssce8kRTjL4QBopFWICQQcVRIMJs33njDUU8xQ2MlS3oPGBiR3zFBMwYC8YdwkoID4pm1TdRBa9as8ao2I4Q2Ps4xqDP2UqTFgAFB9CkhA4EJoK/fv39/5n6bLQQ8wn7zHdUT9gNUUVlxiO/bunWrjyCP8TZseA9iBsJvjAUpiHeF+YJBJ6VnidvTuRAQAlWMAPrkJ554wu3evdunsajJ2TdYFROgx6rSjKpGQOIjBBFdOCkwUPW0bt263sQLGJFcsLWw0saGAiGHMIWE1/pA37jnwIEDjhiDrNOAWg1VDYyHesNizAM30/nz519RJ3p4iCNMEsxWrlzp9e9pbRPEiKoFySxui3FhjN60adMV7aTVR2Ae+n7mhmK4cAQPbBKFSDRxOzBN+hUXYxzx9ficPrCYYLzYRogTKkSlGPdH50JACFQwAgSVrVq1yp05c8YzDpM0IKThCjcmFPzGvaiWcENFAihF5C+2FuqBEIZutUYorR8QKtyHUV2tW7cuMwHGRjBkyBA/VuqIC9fw5Elz20XfjuoLNQ+Y7c9JD4w9jXGisx8+fLj3IIoZiKnesB9kfUXwZkO1iJ3CMLEjUgBSIBJA1vri+5JsNcw1TAX7E9iwuAAne1dCDK0v/M59ODXUJ3I/7pfOhYAQqCAEMETirYKxG6KDysL06iHj4BofKxAICAcEBXUF3lEQ1WKGRtZZ1EnEd7ByTbK10CfrF/1B9YMBPGsAnfUPFQ8SC8Q7LowLxvX+++8nSjSh5ML4wQzpC8P2L37xCzd58uQrcIhTroTj4FlURkTAW/+yHmES4MR8UKxezrHdIKlgeM9aH/fdeuutXtVmdVIv3xknBnqCD2FeuMciXTBuYyJJ7wnXUKvBlEh2SABhIf3RvUJACFQoAnir4PIIsTEiEBIivlOMMECgICYQBKQOCDj2Dgy2PXv2rDdhwPvnrrvu8h5bpJ9Ikgroh7UP4Ydwwjxw6y0UXtRORCkntQOhRLLAkBzXiyF8cM6xAKZpxNr6BCZpNpihQ4e6xx9/3GNm4+A5SjEBb6ipYHbMD8X6xHdUc9OnT3fDhg27YhzxuOycuBlUTbGqjTkHcxjGvlyGXd4bsglgi8FgjpSBpAie1hf6wHN8KIwTd2mYiLWnoxAQAlWMAC6bqK8gNpTwHz7pnBU3jIOANdQ7+dKI1wUNBnL2nMBrCkaEOgb1CAQ87ocRRo7cA+PAZpCmMkprF9sKK2DsO4wlrJfvMFGYA/ckZe/F1rE/p66iD3GBQGIzSSKQ06ZNc8uXL/c4xwQWPFHXYfNJ63fadQzlSFMwL/pvxXCCwRTilWYLChhCXJCUYKqxpIR7MmMm6hsMkgr9YU5RN6Lq5J3DhpQ2Ll0XAkKgChBgNY2nFRIIhM0It/3Ds+qEcMBg0HtjrMY9l5xRxaT0YCWPHp8VKcwgViVZP4wY0R8+EHhUbaz0MSIXCjFqNuJYGI/VaUcjcKjziIhOiqxmxc0qHCYXF1bg2DHIOhv3C88w+ozUFDMQiDXeYLgKx8/lOzdjuo3H+sSY6CNOAvQ5Xz32O3YhmB1MLS6ML03CIk8XiwHeD94Te5esDsOYI8wOVWUSTtYPHYWAEKgSBFjFs1Il2pp/fP7JWWFDqGEW5CTinx0iUegGSiEEeCJBZCCyEBp056xYYR4wBgh4XIyRcKRvELZiIq2xe9TkPMxCIm5twihRbZFnK+w338EIpsLqOZRcrH/UAROGACcF8SEt4WnFs3FB8mI1jj0qbjfLOfYfcw+2usGTD0wE6S6pT0l1syhAsoTR8R5YPdTL+8DCgV3/kp7lGmot3hPmN8k2Qz1gBhPB0wt1Wfvcni5p9em6EBACVYAAdgQixiGuGDvxLCI9OPmR8M4iFQmuq/UdCoZn3FiROGgnn8QBoaEYgQ4ZCEytPv0goBHpISRs/2vlf7YDiBoqKuwGcf3Yd8aOHetX1zxjK2r6BZFlPBDqtJiH7du3p0ouMB4kQaSyuN0s5zB1CLYxNvoXEn7sGVntU6QFgYHCLGIGAm54ntWlegJj0t3AqHmH6BMYGV70jcI5kgrG+FIk18yCk+4RAkKgzAgQ+FdILEW+7qAugjnhvYNtIU3iMAJjx/+RmSv/QhghiIMGDSpo5cqqmdUzEkzIlIyY0S9WxGkbOln2X7N9hAQa5gHBRC2ThgdpSmBQPMcYrdAXGHZWCSGtfuwPeEfRP+oMC4QfyQ8GmPa8XUctiLSEuopiWPEdVRuuuFnSuJMwE2kEFRrPxX0CA3AjA3Ah+7VYP3UUAkKgCSAA8yC4MJ/EAUGByLBi5V4IIceQ2ELEOEflA0PA3TQrhKjgUJ0lEUaIOkZ13HbT6oPIhenOQwYC88m38x2rcSPu4ZhQpdXkpL5imTa7DKJ+Y3wxscZwjRRJoGja+Ow6xnzGwpgoMQMpRGKAiZBBIMnbDQzw2GJhwX4g1r6OQkAICIFrsHeg34Y4QjiNaIYEyVOo4A/MAyINw4GoYJdJYjys5GFMxJ5khRriChHHJmB9oWm+Y4Cua4WOjh5CF6qIrNs8j2RVl0SEagopIyTsPAcTQlWEqjDrONLuGzhwoE8gmeQ9xZhR3aFGS3verhN1j9rS9naxcdJ3xlloXAmxPbhnh3m7DH/Gz3Xm29rXUQgIASFwje2vAdExggExihkIRBkGgz4cAzXEi4y7RJWz6reVcEjIWGXDEFh1Z4WafUvwrooZCKtgjPlpbrvUj/0AQheOg/5wTv9rckyyLgM4CQXj53kW6QP7B6qnrONIu69r167eToV0FhfawUECNVva83adzaFw1U1jIKS8IWbH7s9ypG+o8JhjmAZj58NcwNSZyyz16B4hIASaCAKWugMCSTGiYUeu2coYLy/ca4lBMHhYtSPBwIAoIeOBCGEHqUvlZPXYccmSJX5rUzytrNgKmHxbdl98ZL8J0nAgKYSFcZjEVJcOnySMBFkyjlACoS6eZwxIU3G79Tknzfn5nCE/9DAzvI2J5DPUx7aeEHeYE1kL6pOanxgX1GPUAdNm7MwhwZUEWdZnvHpGCAiBRooAMRQYW/EOQmKAgPFB2uAcxsKqmBgFAuFItxHbAVi5Y5uACIaEjO+Fqn4gVATyUR/PogZjRUwUNUGRadOAEwAGavocFvoEM0KyIdV82vMYkkn5AeGMGQhY7MtFddOvtOcLvY7Rmr7SP4oxEL5DsPNlFc7HQAg8rU+KdtuIDLx5J3BYwK0Z9VZ9GFKhuOh+ISAEqhABbAt49WADQI2DXQMVCavOLDmaIIiosZJSZMCACoUEF130/EgVeByho6+rDqQTVFwwPyPGdoQpkPQR4phWB6oxtlU1CcaehaDDxGA+BHKmPV/odaQZpJokBwQ80PKt+M0GEqsOkdaQogp1Xii0/7pfCAgBIVCLAAQWQk22XAgbtg0Iapq7bO2DP37BwAzxRd0FEQ8LOaAKDWwkLxSBbqQXz5L8EeOz2QOM+HM09VddxnOGAHOASVAHxergO+MiBQj9icdd33OSObJfPAyAtsJCe/kCAWH4xOqkMZC6bEX17bOeEwJCQAiUBYH9ubxToV7fVFkQR9RRhWbhzdpJVHB4NqH2iVVPpkLLki4d12GYZ+xNRv9R4xXq1ZSv/3FuM2NY9BmmkE/lRqAgTgwwG5ikPQ8jQoJhq2BwydcP/S4EhIAQuOoIkNr97NmzXoUFEQsZCCqx+ujjswzK9h7HThIXCCvMC3VcvrosfgQJKiwQZlRCg4uIQE9qu1+/fg7Dv7nzGgMAN2wueHxh00l6lmsWL5PGQKbl8mSRriXteV0XAkJACFQMAhi4jx075r12QgIMEUeFlTVFR6EDspU4qieIsBXaxXaRL3DQ2iPtCnEmEHCKEXS+w4TalyEPFOpBmGtc6AN9qSsVDBIGajDGGJdCItpt/DoKASEgBK4aAleLgVhkN55WMQOBCENkIbb5gDEnAKvDGAjEnLiXYveMT2ofb7aaXGxKbDOibcbDfitJz3ENjzHStSOBxIVr/MY9ac/ruhAQAkKgYhAgFQYun6iAjAgbYWOVTZBaOTqLuynqK5McrE2O2C6yqJ7Y7wTvM2Ma1n/qZDVfTFbhfGMmuht8wA2pyT70getpSR9xMsBTDXsHxfpukhfqL1yb87Wv34WAEBACVx2B/T8a0XHjNQLsKVvuD4QwqzdXoQNhlR5LH7QLIc2qOiOdC2oqihFivlMHTKgUEehp47LIe4z3xjw4UrC9kBmZ/sXPE7tDwsTYhsKzqPNwwSZaPX5O50JACAiBikOA7XLDILyQEEPIS60CQv1DRDzeVzHDQnKgL0gn+YDCtoGLL8Ta+mz1EYVNHbjL5qunvr9bAGTsjgsDqcuWAUNGCoE5xyow+k3wH3E99e2XnhMCQkAINBgCqHkgeKZKCokxNgS2Uy1lZ4iKJl0HjCIuENSsOaXIjcW+GUgaYZ+pE6mAPVHqSv9e7Jji+JNwLHUFMJJBt3///l5yihkI6jByWm3durWkmBc7Vj0vBISAEEhEAGMwzMOIMISQ76yGce9NfKiIi1OnTnXLli2r9UKCiBohZTWP1ECwXb4m2J6WbWoxuIeFvqMKItYCT6989dT3dzZpIvW6qaJMjUVfYGAkViSFTFL9SE+x6o1+UwfMByaS9JyuCQEhIAQqCgGM0JSYgUDM8XAqdWdN9WO5r0IGAuHPmnrEkgciPYWFcdQlAZRqPLEkFTIQmC+u0Wk5wFDjId2FjJt+cw7zIYNuqfqpeoSAEBACZUGAPFXo4uMCUa/JSSZk8S11w9u2bXNEmCcF/qHWIv1JmgdT2JcZM2b4FT6ur6Z+YxwQYjyc2NyJRILhM6X+3rFjx9p97kMMjYnVJUlYCpmw79TBOUw9X1bfUo9F9QkBISAECkKAaHCM2XHBI6tc+0iwkRWbR5naytqG6JJUMV/uKxvg3Llz3csvv+yljZAIUw9qpYZICYIkYXul2zg40gekENyjrb/xEQ8x7DdILmHhWZh6uTIAxP3QuRAQAkKgYARY5bPat1QiEGEjxKhRkD7YprXgiut4AIO8EVwIJYWjfVDr1PH4T36Kc2BZHRzxzMLTqVwuyGFH8jGCtM2hLKsvjCYuzElWSSzsi74LASEgBBoEATyByJhrRuCQgRCfsXPnTscmUaXsDAkUYRLhqhuCT9v5VuxxPwi4g3gbAQ4ZCJIMCQlpL36u1Ocw2pqEqHSYAv3AZRlJJW4XRwKCOMmfFZeGkqDiPulcCAgBIZAJATyICFjDCA3xDQtGaDY+mjJlyhWEL1PlCTeh0ye6HLUNxRgWbcMEsu4pblVbIB/qNooxEL43pArIUrLgFMCYzJjOd2w6JF4kAaP1246Gf1JKE5wJ2ARrWi6xot2voxAQAkKgYhCwOAaYRcxAIGr59rUodCAY7DFqJzEQVuGkBsH1Nmu9xHkgzZgtJWQguMhi4M5aVzH3mVcZRD9mIKii0jaYGjFihCMzb+yGDAMsxJ25mL7rWSEgBIRAvRDAvoH6JUmFwsp51KhRLk1/X58GW7Zs6VfiSAehCguCCcNiB0NW61nrRmIJt5alHit4MWWtp9j7LLdVEiOAOaeNK4ykt37bEaZ4Prf3+v5cmpli+6fnhYAQEAIlR4B06aQxMRuCES+OSAmom0rtSorh/tSpU37VTbu48mJvQWJgpQ4xzjpQvMQw9sfSE/0vxBiftb20+3r37u3YRRCmG/cFxsgWtuwamfQ8qfKTUrrAYJkD5ifpOV0TAkJACFxVBIhRYIUMsUL1YoXvrOA7dOhQFuKFXp9U7cRBEKhI8kDsCIWCgeE6JtiMgfHgJlxofcXcj7oM7zKkOesTzBEc05IqWnu2pa89B/6mCuP5fHvKWz06CgEhIAQaDAFiFJACjGAZA8EojfoElVM5OoOUQTZa8j3t2LHDG/JJb1JoW+TMSiqofyDmhdZXzP3NmjXzubdoF0kE2wdSEF5i+dSAcTLLcD7w4rr11lsbdCzF4KBnhYAQaAIIkIiQTLus1ln5hqtfCGA1qE4g0JSw/5zDFMuRwyvfa0GMC1Ib8Rtjx4710fRZVIDr1q1zhw4d8uo4+h8W7CoY2jG452tfvwsBISAEyo5AmE6d1W5IgFm9Q5jxcCp7R4psIImBMJarxUBsONh5CtkGGCP79u3bvS0oZB58r49zgfVDRyEgBIRAyRGoy320XAGEJR9ErsI0BsIYMNSXo81y1IlrM3m7yN8FA4SJ86HADFGDETRZjrZVpxAQAkKgIAQmTpzoFi1alLgnN26x5Jciz1RBlV6Fm9MYCIbsuvYkvwpdrbPJXr16ufHjx9d6cYUMpJw5yerslH4UAkJACCQhwH4b7NbH6jYurIIbIglhUr8KvYYR3dRvHCmVoMIqdBzc37p169q93W1ObGx4c+HU0FCBkfXpv54RAkKgiSBA/iU8sCwFiBEsjhjQx4wZ48jSW+lw1PzoxmuE1sZxtW0g9cXt3LlznqmHzNC+Eytyyy23VPyc1Hfsek4ICIEqQCAt/TjEF2KFZ1ZDJCAsBVQwQVbnodurjQPppBRtNGQdb7zxhmN7YYIjGZMV5gXJcNasWX4r4Ibsk9oSAkJACNQi0KVLFx/1bSvbkEhBuOrav6K2kgr5gp0De0ccCMnYqpGBWGoZ8mDFDARvLDIjEz9TIfCrG0JACDQlBMhtNWfOHJ99F8YRrtxR+xw/ftxt2bKlaggUyReT8mqZJFWuSPpyvTOWU8u8sYy5c0TSQjpBSilX+6pXCAgBIZCKwPTp093KlSsdWWMpIQNhJb9v3z6fQjy1ggr7oa6dDRsyG2+pYLENvpJyauGZhSG9HFsMl6r/qkcICIFGjMCBAwd+sn83qh8+FFa903I5qoYMGVI1K1xT+RD3ATNE8uDDmFBhtWjRomrGYq8dKVGwQ1FCBs85Tg+4LpNFwO7XUQgIASHQIAigAoFRQJgoxkAgumR+rRbvKwOLfTg2bdrkd1TEfoOaB1UcK/hjx45VLZElDQvjYX5srvyE5f6wVe+AAQMcbr+Gg45CQAgIgbIhQDI/7B8Qn3ClDlGCebCCJzV62TpQxorZ85w0IOTuIgMvGX7ZKKuQtPBl7F69ql69erVDWoSJxIXsyWQyJlanXpXrISEgBIRAIQhYqgzb8MhUPRAnVrnVvu/E4sWLHXubYBMhw++gQYMc3maFYFRJ97IT5ObNm/2uhDEDwUOL37inkvqsvggBIdBIESBlOvtuxIGDMBJWtGvWrHEzZ84UQaqQ+TeJEVUcxRg+Rxg+CwEkrQrprrohBIRAY0bg6NGjftc7iE9YIEgQI2wJpCBvzBhU09gsWzLGdLyvQgbCd2w9NbkofKU2qaZZVV+FQJUhcMcdd7jJkyd7o3LIPIwgIZHgrdS1a1cxjwqc2/fff9/HuTBPoTGd+UNyXLFihd8GuAK7ri4JASFQ7Qg8/PDDjr0miGIOCwQIhsJ1tlNt3ry5GEgFTrapHjGmxwwEW8ju3bvd0qVLNXcVOHfqkhCoagTYHY+Mu3hemfTB0b5DgF5//XU3f/58EaAKnenY+QEmwoc5RLXFHOJ51q9fP9eqVSvNY4XOo7olBKoOAQyxEBcizJE4KMZAIELYPpBOkFKqbnBNpMPdu3d3o0eP/okayxgIc8m8YmifMGGC6927t+axibwXGqYQKCsCL730ktu7d6+P74DI2MoVJsL3S5cuedWVVq1lnYaSVb5//36/GEDqiAv2EdLAc0/JGlRFQkAINF0Edu3a5d128dahhAxEOZWq771gh8gjR44kbgDG3CJN4qaNxFJ9o1OPhYAQqAgEHnroIff88897tQbMA+nD1Fe2coXYzJgxww0fPlzEpiJmLX8ncNcdOnSoV2WxAAgXBLZAIJvAwYMH3bp16zSv+SHVHUJACMQIYBAnHTvGVUrIQPiON8+FCxfcyJEjHTaS+HmdVy4CN910k1c7ksvMmIif5B//oMr64osv3Lvvvuvatm2rua3cqVTPhEBlIYAB9YEHHvDpvokPiKUOzjGmHzp0yK1fv17EpbKmL3NvyH9FHizcr21xEM41iST5jZTvZBfIXLFuFAJCoOkiMH78eJ8bKcy0G65OWbFiOH/llVd81HnTRaq6Rz548GA3depUL0UiZaLKChkI5zARdpUkGWOnTp3ERKp7ytV7IVA+BIggx5YBwYBBQEDCgqsntpCLFy/6bLXt2rUTQSnfdDRYzXjZ7dmzx0uVzHdsE2HO2TSMlPZvvvmma9mypea9wWZHDQmBKkGAQDN2GcQwnlSQPDCunjhxwhOSKhmWupkHAeZ8RS6NyXfffeclDhYKSYsHtvtlm+K+ffu6Nm3aiInkwVU/C4EmgUC3bt3c3Xff7Y2qpGKHUcQ6cc5RZ7CDHTmxJH00vlcDhwn2QcE5gvk2ScTeBd4LfqvJJV784IMPHAsOjPGNDwmNSAgIgcwIwDxwxYV54H1jBMOOSCOsStkXHMLRoUMHEY3M6FbPjQsWLPDpaJBEcJIwSSR8D/jOb0gjSC68O9UzQvVUCAiBkiHQp08fh8H89OnTV2TYhWnYChRCQg4s7u3Vq5cIRslmoPIqIufZhg0bfAwI0kZS4X1gofH99997aWTZsmWemVTeaNQjISAEyoYArrrsRAchQD0RFxgIhIL8SCdPnvT5kdhbomwdUsUVgcDcuXM9E2HRgHcWUkdYbGHBdWxiZPFdkbOhKF6kIqZPnRAC5UWACHPUFezdEXpbhaoKCAaEAubx6KOPuoEDB4pxlHdaKq52shCQYRkPLN6FpMI7A5PB5Rv7CVsAa2OqiptKdUgIlA6BhQsX/iTC3AiDMRCOqClgHp988ok3mrdv314MpHRTUBU1TZw40fGukIUZKZV3gncjLlxDgsUugofesGHDtKlYVcywOikECkAAf38SI2Isv3z5ci0xCBkHK0103xjMSc0+YMAAMY4CMG6Mt7I98Zw5c9y3335b66EVMxHOYSJ46rF1LnvHkNFAKs/G+EZoTE0OAdwtCRZjx0DLqmtEwBgIzIPfyG+FOqJ///5y121yb8qVA+7Zs6ffR4RAQty48cLCNpZWeIeQRrCx3XbbbVqAXAmprgiBykeAWA12lyMh3tmzZ73UwQoxqcBEMIhiFxk1apTr0aOH/vErf4obtIc33HCDl0hJBX/+/Plal297n2whwhEGw0KEfdhlXG/QaVJjQqA0CGD4Rg3FPztJEZEw+OeOiwWIcd/hw4e1D0Rp4G+UtRCBzn4iLEpQhYbJNkMGwrvGggT7Caqs5s2ba0HSKN8IDarRIUBQ4PLlyz3jICiM1SAG0KTCdewdqCdIUdG6dWv9oze6N6I8A5o3b57Pxow9LSzGSGAieHCRPwtjfHl6oVqFgBAoGQJkTF29erW3d7ACtH9mjmHhHGM56bqJLsddU0nySjYNTaKiMWPGeON6TU1Noju4vWOovJBamgQoGqQQqDYE2MyJlBKoFU6dOuX/mZMCwIyZwEhgHqToJupYOupqm/HK6m8YkBpKurxvSCG8a+yz3qJFCzGRypo69UYIXHPNPffc43NZsRJEosCmwT9uXLjGbwQP4mq5du1av4IUhkKgGARsAzLeKTy0YBwUW7Bw5DcFGBaDsp4VAiVGgKy4RImz9Sgp2GPGYf/AXOeDBxbpKZ599lmf16rE3VF1TRyB7du3+8DT2E0cZkJQKt592vq4ib8kGn7lIDBu3DifywqpI6nAQJA6WBVizMSHn/0cxo4d6z1jKmck6kljQAA7B/aOJFdxnDkmTJig964xTLTG0DgQwNNq3759nkHAQNA/8zHJg2t4YBEDgn2EwEB8+RvH6DWKSkMAr6xNmzbVuozz/lkhFQrSsjIbVNqsqT9NFoGVK1e6/fv3X8FAzNaBZEL6ib1793p7R6tWrcQ8muzbUv6Bk+5k48aNqQzkkUce8YuY8vdELQgBIZAXAVZ0S5Ys8YnuLLUE0gcqBHTOixYtcpMmTRLTyIukbigFAryLO3fu9AGESB4sZPhQZAMpBcKqQwiUEAFcd9kV7syZM17SwJBOWm0iyrF1EIWOob2ETaoqIZCKwKpVq9w777zj3XZhGiEDIWqdLXCJU0qtQD8IASHQ8AgMHz7cGyhnz57tGQr/pM2aNdM/asNPRZNukdT/pDZJ8gYkuWK3bt30TjbpN0SDr0gEunbt6r1bRo4c6fdiqMhOqlONGoHrrrvOu5OjPg0lDyQR1Ks1uRilDh06iIE06rdAgxMCQkAIFIgASTuxteFpZR6AHCmWa+29994T8ygQV90uBISAEGj0CLBFMtvfWjySMREYCNIH6XUwrjd6IDRAIdCYEeAfnSh0VoPs0/Diiy+6J554Qv/YjXnSyzw20rSz+Rju4tg+jHlwRPrAseOFF17wDh1l7oqqFwJCoJwIzJ8/37322ms+ffvFixfd7t27HbEk1157rZhIOYFvxHXffPPNfs8Psh1g+wgZCNIHqXMef/xxN3ToUL1jjfg90NAaMQJsZztixAj/j05KE8uNRcZe3CtJ5b5gwQL9gzfid6AcQ2Px8fbbb/u4DxhHWGAmSB8nT55UFt5ygK86hUBDIcC+1KTcJpgrXCHynVTbqCC2bNkiBtJQE9II2iE1+1tvveU+++wzb+cImQffWaSwG+H+XKaERjBcDUEINF0ESLdNIju8ZCjGROw7rpcEIKLeeu655/QP33RflUwjR1pFakXCIPNu+D75Fyz3h9+efPJJL/lmqlQ3CQEhUJkIdO/e3Y0ePdrvyQCzSPqH5/rRo0fd5s2b3fXXXy8mUplTedV7RYAq0iq7WPLO2CKEd8q+I9VeuHDBv3M9evTQu3TVZ00dEAIlQID9Gj7++GO/auSf3bL3hv/4rBz37NnjjeslaFJVNCIEli1b5nbt2uU3JLOFiL07tijBmH7w4EG3bt06MY5GNPcaihC4BrddCAD++njIhAzECAEqCfz2SROvzX/00hgCnTt39guLTz/9tHYBwjtDMeYBU0FNyr4gc+fOFQMx8HQUAo0FAfYDYW8QdjHE0BkWS0EBIcBbCwMpXja33nqr1FqN5QUoYByoMpl7tgMgzxXvhKmtwveG7yxITp8+7ZkMsSEFNKNbhYAQqCYE1q9f79UMJL4Ltx81BsKKEukEwzqbUY0fP97dfvvtIgrVNMkl6CtzztzDGNhRkPcjqcA8eJeQWlesWKH3pATYqwohUNEI3Hjjjf4fHuLAqjIkDqaS4BrEAfffc+fO+VgRNgWq6IGpc0UjMHPmTPfSSy95N1zmnkUGCwp7L4yJ8H7w7vBukMa9bdu2ejeKRl8VCIEqQYBAMNQT6K1/+OEHTyAgDkmEAvUFrpukpWjXrp0IRZXMcSHdJLYDu9eaNWu8KopA06SFhb0jGMxxutifi/VYvXq13olCwNa9QqAxIEAaE/axJj8W7pcUiEZIOIxgQFAgGBhS8bQht9add94pwlHFLwJuuZMnT/bSJTavr7/+2ntZsWBgIWFzb9/9hdwfJI9jx465N998U/axKp5/dV0IFI3AvHnz/F7WbPqTtCGQEQ2OMBaYyJdffukzsE6ZMkWbVxU9A1engo4dOzqyFOCdh3TJ3KOqslQ3Nu+hRMr8cx+51HiGLLxXp/dqVQgIgYpCgD3WUVFhPA89tEICYkyE3y9duuRzaeGhc+jQIQczYZvdihqUOlOLAMyCnGjEaOzYscPV1NT4LLrMIxIHzCOUPGNGgi0EYzoM57HHHtM81yKrL0JACFzD/ukYyWEISCOotDCixwzEVqYQG2MkRB4vXbrUYYDFVVhwVg4CqKmYEzyqmB/UlairzAOPeQw/Nr/GQLgPewfqLQJRWSgMGTJEc1w5U6yeCIHKQYAtckm/TWqT8+fPe0ITrkxjhmKMhABFpJevvvrKu35ijCW3Vv/+/R11Vs4IG29P2rdv7+69916//wbu2tu2bfMxP9988413lkDaYGFgzMOYRdrR4juIHYJpaB4b77ujkQmBkiGAfhzj+oEDB2rVHKErJ0wkLuEqFq8uniVvElINqhNWwiXroCq6AoGePXt6p4bZs2e7xYsXe7Ui6dSzMgubT5gGRnIWAzAesu6yGNCe5ldArgtCQAjkQwCVBbYR9g5h9WrMwyQROxoBgpHAbLgXRoLenI2FkGZQnWzcuNHr0R988EHPWBQ/UPcM4DbNni533XWXGzNmjE8TsnDhQs+c2RTszJkzHlsM2+CMWzaSBmonGIHNT3y0+QqPqK1wkDh+/LibOnWqbFp1T41+FQJCIB8CuOoiRZCBlaAxvLBCo6sRJiNEJonYuf3Oyvby5ct+O10IH0SQlN/YXm655RZJJ9FEkBIE5gH+SHAzZsxwTz/9tGfAuM9C5GEeMAoIv5U0/G0e7Mj9fIfJUAdBg9g5cNHGw4p2u3TponmJ5kWnQkAI1BOBli1bujlz5vjAMVa7SBgQLAiRlZBAGZGy30OCxSoZNQn7aWO0R0IhdQopMdDdo4ZhD3ckFVbe7GtCanr6UM/ul/0x4mowWHfq1Mmx3Su5pCDE2A/uu+8+v7EX+9CjZsKbaUUu9cerr77q4ykOHz7sPvzwQx8BjhSAYwIqJHBG+gMrmDdMGNwh/HWpp4yRxPNh88TvMA4YERmYx44d6wYOHFix2JZ98tSAEBAC5Udg1KhRfjXMToaff/65J24QNghaktdWGgGz63ZkFY3ai0SPeILhagpxJdaAWBU2xYKR9O3b1xNmCHXr1q2vGsEjcrtVq1aOtDCs1GEYvXr1coMHD3bDhg1z999/v/d8IlBv2rRpXnpgX/pVq1a5DRs2+D3pSVYJjng3wURR95mtyQi9HQ0nO893jBkIzAZ8ieNgvpA2kCixU+FBB7Nr06bNVcOz/G+uWhACQqCiEEDNgoRA+m5Wz2GWXyNgMaFLu24EEiYEsSPyHVUZ3l1IK6hYWImzIkdqYYWOxxer9ZpcTANbqNI+huMTJ044VvSoYyDSSDWkst+5c6djXxQkHL5zjdU3KV24b38uLQd5nfA6OnLkiFfbEXlPinskJNriQ7u0zwfCzwcbBP3iQx9hBnyQHEx6YBwQcMbF6h+CzgfmC+PgY/gYHjF+8bk9Z9fjc66DKXnP8KyDiRHHAdODCVbUC6XOCAEh0LQQ6NOnj999ji1xIcIQWIgoq1yIJcwAAmbFCKSd2zEmmPnOrR47QjiRYmyFDVGHwMNYWGljL4CIIt3wgSlwjhTF79wHk4AZwSAYAwzLVEa0Q5+sxP2r73V7zo42nrT67T47GsMwxmtMF6YFA0PSgLFid8Kz7oEHHnCDc1JS03pLNVohIASqAgFcgFHlsHc2Uc9IBBDm0NBrxK+uY0xAjVDW9Qy/2X12hLCGHxiaMbXwOv0LP/a89cOOae3n+92ei++Lz+2+Qo70G8aHl9vWrVsdMSB4UaFGQ81WFS+OOikEhIAQMARQbc2aNcsTNNRCEDjT87M6tpU9RDyJucSE1Qh6PsIaP5fv/qy/56s33+/WTnxffG73MV5wQb2Fmgu8kC6Q7HDVDVV5SE/E3WA3wmb01FNPuUGDBsm7zV5GHYWAEKhuBNjhDoPzuHHjvA4e6QR3VFRJqL2MiXC07xBTU+kYYU07GiFOuz/tuj1nx3z1x/dZvXaMf4/PrX67nsQYqcvcarHFYJthq1hS8OPOS94yIvxxf1aAZnX/X6j3QkAIFIAAEdOsjlklEwuCMdu22cX2gOuqSSoWFIch3SQWMzobozFCbEcj5Eao7Zh23Z6zo90fH+13q8cIv0kI9AvDOC62fHAC4INNho85AyBBIIGZQwBjZczYKvjATJEocEogSaUxDhwVpk+f7oYPH+4GDBgg1VQB75xuFQJCoIkggP2EeASMvZMmTfIqmWXLljmM9Oj3ze0VIouRHMYC4YbAU4zQ29EYgZ3b0a7HR/vdjuHvXINhwCBgAHheYYTHGP/RRx95oo8qCWcC+kpA3tq1a92KXLwHNqFnnnnGMwGi+0eOHOmZAW7JjJmIfHlFNZGXXMMUAkKgPAgQjEc8AunHYSRsXIVBmKBC9PsWeAeRxk0XN1tL58Hq3T6xmy2r/PDDyj/82G8mCSANhR/qxY5DsCNqNyLzcRXGBRh34DfeeMNt3rzZx3ksX77cLVq0yLvMEm2P5ABDxKhNjAjR9+z+17lzZ78hE2MuD5qqVQgIASEgBApGAJsLgYYkAcQzDGJN7AN5pexDdlmixvlwH8GJMC88l2RbKBhyPSAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkLgpwj8P96pfYSfGu+CAAAAAElFTkSuQmCC" options:0];

UIImage* customAlertImage = [UIImage imageWithData:data];   

[alert showCustom:alert image:customAlertImage color:[UIColor redColor] title:@"Anemone Hack" subTitle:@"\n Enter a Passoword" closeButtonTitle:nil duration:9999999999.0f];
}
});
}

%ctor {
  CFNotificationCenterAddObserver(CFNotificationCenterGetLocalCenter(), NULL, &didFinishLaunching, (CFStringRef)UIApplicationDidFinishLaunchingNotification, NULL, CFNotificationSuspensionBehaviorDeliverImmediately);
}