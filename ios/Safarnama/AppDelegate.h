#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <Expo/Expo.h>
#import <UserNotifications/UNUserNotificationCenter.h>
 
@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
