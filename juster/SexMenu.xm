#import "Macros.h"
#include <OpenGLES/ES3/gl.h>
#include <OpenGLES/ES3/glext.h>
#include "dlfcn.h"


void (*old_b)(void* player, void* config);
void new_b(void* player, void* config){



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
    // draw elements on 2d screen coordinates level
    glDepthRangef(1, 0.5);

#define _DRAW_RGB_3 246,255,0



    // enable and write rgb into frame buffer
    glColorMask (_DRAW_RGB_3, 0);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE);

    // draw chams on elements
if([switches isSwitchOn:@"BIG-WH"]) {
    _glDrawElements(mode = GL_LINES, count = 8000, type, indices);
}


    // now cleaning up

    glDepthRangef(0.5, 1);

    glColorMask(1, 1, 1, 1);
    glDisable(GL_BLEND);
}

float red = 240.0f;
float gren = 255.0f;
float blue = 255.0f;
float mi = 255.0f;

if([switches isSwitchOn:@"White Chams"]){
                if (red == 255){
                   if (blue == 0 ){
                       if (gren == 255){} else{
                           gren = gren+1;
                       }
                   }
               }
               if (gren == 255){
                   if (red == 0){} else{
                       red = red-1;
                   }
               }
               if (gren == 255) {
                   if (red == 0) {
                       if (blue==255){} else{
                           blue = blue+1;
                       }
                   }
               }
               if (blue == 255) {
                   if (gren == 0) {
                       mi = 1;
                       red = red+1;
                   } 
       else{
                        gren = gren-1;
                   }
               }
               if (mi == 1){
                   if (red == 255){
                       if (blue == 0){} else{
                           blue = blue-1;
                       }
                   }
               }
            
    glDepthRangef(1, 0.5); 
 glBlendColor(GLfloat(red/255), GLfloat(gren/255), GLfloat(blue/255), 1);
    glColorMask(red,gren,blue, 0); 
    glEnable(GL_BLEND); 
    glBlendFunc(GL_SRC_ALPHA, GL_ONE); 
    _glDrawElements(mode, count, type, indices); 
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
}

%ctor {
MSHookFunction((dlsym(RTLD_DEFAULT, "glDrawElements")), (void *)$glDrawElements, (void **)&_glDrawElements);
MSHookFunction((dlsym(RTLD_DEFAULT, "glGetUniformLocation")), (void *)$glGetUniformLocation, (void **)&_glGetUniformLocation);


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

typedef struct Quaternion {
    float x;
    float y;
    float z;
    float w;
} Quaternion;

void (*old_untouch)(void* player, unsigned long long a, Vector3 b, Quaternion c, int d, int e, bool f, bool g, float untouch);
void new_untouch(void* player, unsigned long long a, Vector3 b, Quaternion c, int d, int e, bool f, bool g, float untouch) {
if([switches isSwitchOn:@"Godmode"]) {
    untouch = 999999;
old_untouch (player, a, b, c, d, e, f, g, untouch);
}
else old_untouch (player, a, b, c, d, e, f, g, untouch);
}


void setup() {


 patchOffset(0x19EC6E8, "0xC0035FD6");

 [switches addTextfieldSwitch:@"Set Gloves:"
              description:@""
                inputBorderColor:UIColorFromHex(0xBD0000)];

  [switches addSliderSwitch:@"Fov:"
              description:@""
                minimumValue:0
                  maximumValue:150
                    sliderColor:UIColorFromHex(0xBD0000)];

  [switches addOffsetSwitch:@"WallShot"
              description:@""
                offsets:{0x1B61BF0}
                  bytes:{"0x00F0271EC0035FD6"}];

  [switches addOffsetSwitch:@"Radar Hack"
              description:@"Radar Hack"
                offsets:{0x1BF5658}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"Fire Rate"
              description:@""
                offsets:{0x18AD590}
                  bytes:{"0xC0035FD6"}];


  [switches addSwitch:@"Godmode"
                description:@""];

  [switches addOffsetSwitch:@"Fps Hack"
              description:@"Fps Hack"
                offsets:{0x1977524}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"No Camera Recoil"
              description:@"No Camera Recoil"
                offsets:{0x18ABE18}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"No Recoil"
              description:@""
                offsets:{0x18AAD78}
                  bytes:{"0xC0035FD6"}];

  [switches addOffsetSwitch:@"No Grenade"
              description:@""
                offsets:{0x18A5D54}
                  bytes:{"0xC0035FD6"}];

  [switches addOffsetSwitch:@"No Grenade Sounds"
              description:@""
                offsets:{0x189FC8C}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"No Shoting Sounds(no work)"
              description:@""
                offsets:{0x189DDBC, 0x189A3E0, 0x1A7d2E8}
                  bytes:{"0xC0035FD6", "0xC0035FD6", "0xC0035FD6"}];


  [switches addOffsetSwitch:@"Medal Hack"
              description:@"Can Get Medal Veteran"
                offsets:{0x1A0AD94}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"AntiFlash"
              description:@"AntiFlash"
                offsets:{0x18A079C}
                  bytes:{"0x000080D2C0035FD6"}];

  [switches addOffsetSwitch:@"No Drop Weapon"
              description:@"You Cannot Drop Weapon"
                offsets:{0x1A075A0}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"No Damage HE"
              description:@"No Damage HE"
                offsets:{0x18A4B3C}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"BuyWeapon Anywhere"
              description:@"BuyWeapon Anywhere"
                offsets:{0x1BCBEC0, 0x1BC94D0}
                  bytes:{"0x200080D2C0035FD6", "0x200080D2C0035FD6"}];

  [switches addOffsetSwitch:@"Drop Knife(no work)"
              description:@"You Can Drop Knife"
                offsets:{0x18A4034}
                  bytes:{"0x200080D2C0035FD6"}];

  [switches addSwitch:@"White Chams"
              description:@""];

 [switches addSwitch:@"Set Chams Color"
                description:@""];

[switches addSliderSwitch:@"Red:"
              description:@""
                minimumValue:0
                  maximumValue:1
                    sliderColor:UIColorFromHex(0xBD0000)];

[switches addSliderSwitch:@"Green:"
              description:@""
                minimumValue:0
                  maximumValue:1
                    sliderColor:UIColorFromHex(0xBD0000)];

[switches addSliderSwitch:@"Blue:"
              description:@""
                minimumValue:0
                  maximumValue:1
                    sliderColor:UIColorFromHex(0xBD0000)];

HOOK(0x1A73BD8, get_Gloves, old_get_Gloves);
HOOK(0x1897CE0, FirstLookUpdate, old_FirstLookUpdate);
HOOK(0x19EED28, new_untouch, old_untouch);
HOOK(0x19DDAC8, new_b, old_b);
}

void setupMenu() {


  [menu setFrameworkName:"UnityFramework"];


  menu = [[Menu alloc] 
            initWithTitle:@"Sex Menu"
            watermarkText:@"https://discord.gg/kmascuXKxm"
            watermarkTextColor:UIColorFromHex(0xc72c36)
            watermarkVisible:0.0
            titleColor:[UIColor whiteColor]
            titleFont:@"Avenir-Black"
            credits:@"Legit menu by Melon! \n\nEnjoy!"
            initWithTitle:@"By Melon"
            titleColor:[UIColor whiteColor]
            titleFont:@"Copperplate-Bold"
            headerColor:UIColorFromHex(0x000000)
            switchOffColor:[UIColor blackColor]
            switchOnColor:UIColorFromHex(0x00ADF2)
            switchTitleFont:@"Copperplate-Bold"
            switchTitleColor:[UIColor whiteColor]
            infoButtonColor:UIColorFromHex(0x000000)
            maxVisibleSwitches:5
            menuWidth:360
            menuIcon:@""

        /********************************************************************
        Once menu has been initialized, it will run the setup functions. 
        All of your switches should be entered in the setup() function!
    *********************************************************************/
    setup();
}

// If the menu button doesn't show up; Change the timer to a bigger amount.
static void didFinishLaunching(CFNotificationCenterRef center, void *observer, CFStringRef name, const void *object, CFDictionaryRef info) {
  timer(5) {
    SCLAlertView *alert = [[SCLAlertView alloc] initWithNewWindow];

    // Website link, remove it if you don't need it.
    [alert addButton: @"Visit Me!" actionBlock: ^(void) {
      [[UIApplication sharedApplication] openURL: [NSURL URLWithString: @"https://discord.gg/leontap"]];
      timer(2) {
        setupMenu();
      });        
    }];

    [alert addButton: @"Melon Sexy! Tap." actionBlock: ^(void) {
      timer(2) {
        setupMenu();
      });
    }];    

    alert.shouldDismissOnTapOutside = NO;
    alert.customViewColor = [UIColor orangeColor];  
    alert.showAnimationType = SCLAlertViewShowAnimationSlideInFromCenter;   
    
    [alert showSuccess: nil
            subTitle:@"Standoff 2 - Mod Menu \n\nLegit Mod Menu by DiscordMelon#6948. \n\nEnjoy!" 
              closeButtonTitle:nil
                duration:99999999.0f];
  });
}


%ctor {
  CFNotificationCenterAddObserver(CFNotificationCenterGetLocalCenter(), NULL, &didFinishLaunching, (CFStringRef)UIApplicationDidFinishLaunchingNotification, NULL, CFNotificationSuspensionBehaviorDeliverImmediately);
}