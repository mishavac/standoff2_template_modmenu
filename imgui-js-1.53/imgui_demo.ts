// dear imgui, v1.53
// (demo code)

// Message to the person tempted to delete this file when integrating ImGui into their code base:
// Don't do it! Do NOT remove this file from your project! It is useful reference code that you and other users will want to refer to.
// Everything in this file will be stripped out by the linker if you don't call ImGui.ShowDemoWindow().
// During development, you can call ImGui.ShowDemoWindow() in your code to learn about various features of ImGui. Have it wired in a debug menu!
// Removing this file from your project is hindering access to documentation for everyone in your team, likely leading you to poorer usage of the library.
// Note that you can #define IMGUI_DISABLE_DEMO_WINDOWS in imconfig.h for the same effect.
// If you want to link core ImGui in your final builds but not those demo windows, #define IMGUI_DISABLE_DEMO_WINDOWS in imconfig.h and those functions will be empty.
// In other situation, when you have ImGui available you probably want this to be available for reference and execution.
// Thank you,
// -Your beloved friend, imgui_demo.cpp (that you won't delete)

// Message to beginner C/C++ programmers. About the meaning of 'static': in this demo code, we frequently we use 'static' variables inside functions. 
// We do this as a way to gather code and data in the same place, just to make the demo code faster to read, faster to write, and use less code. 
// A static variable persist across calls, so it is essentially like a global variable but declared inside the scope of the function. 
// It also happens to be a convenient way of storing simple UI related information as long as your function doesn't need to be reentrant or used in threads.
// This might be a pattern you occasionally want to use in your code, but most of the real data you would be editing is likely to be stored outside your function.

// #if defined(_MSC_VER) && !defined(_CRT_SECURE_NO_WARNINGS)
// #define _CRT_SECURE_NO_WARNINGS
// #endif

// #include "imgui.h"
// #include <ctype.h>          // toupper, isprint
// #include <math.h>           // sqrtf, powf, cosf, sinf, floorf, ceilf
// #include <stdio.h>          // vsnprintf, sscanf, printf
// #include <stdlib.h>         // null, malloc, free, atoi
// #if defined(_MSC_VER) && _MSC_VER <= 1500 // MSVC 2008 or earlier
// #include <stddef.h>         // intptr_t
// #else
// #include <stdint.h>         // intptr_t
// #endif

import * as ImGui from "./imgui";
import { IMGUI_VERSION } from "./imgui";
import { IM_ASSERT } from "./imgui";
import { IM_ARRAYSIZE } from "./imgui";
import { ImStringBuffer } from "./imgui";
import { ImAccess } from "./imgui";
import { ImScalar } from "./imgui";
import { ImTuple2 } from "./imgui";
import { ImTuple3 } from "./imgui";
import { ImTuple4 } from "./imgui";
import { ImGuiCol } from "./imgui";
import { ImGuiColorEditFlags } from "./imgui";
import { ImGuiCond } from "./imgui";
import { ImGuiFocusedFlags } from "./imgui";
import { ImGuiHoveredFlags } from "./imgui";
import { ImGuiInputTextFlags } from "./imgui"
import { ImGuiMouseCursor } from "./imgui";
import { ImGuiSelectableFlags } from "./imgui";
import { ImGuiStyleVar } from "./imgui";
import { ImGuiTreeNodeFlags } from "./imgui";
import { ImGuiWindowFlags } from "./imgui";
import { ImGuiTextEditCallbackData } from "./imgui";
import { ImGuiSizeConstraintCallbackData } from "./imgui";
import { ImDrawCornerFlags } from "./imgui";
import { ImU32 } from "./imgui";
import { ImVector } from "./imgui";
import { interface_ImVec2, ImVec2 } from "./imgui";
import { interface_ImVec4, ImVec4 } from "./imgui";
import { IM_COL32 } from "./imgui";
import { ImColor } from "./imgui";
import { ImGuiIO } from "./imgui";
import { ImGuiStyle } from "./imgui";
import { ImDrawList } from "./imgui";
import { ImGuiTextFilter } from "./imgui";
import { ImGuiTextBuffer } from "./imgui";
import { ImGuiListClipper } from "./imgui";
import { ImFont } from "./imgui";
import { ImFontAtlas } from "./imgui";

// #ifdef _MSC_VER
// #pragma warning (disable: 4996) // 'This function or variable may be unsafe': strcpy, strdup, sprintf, vsnprintf, sscanf, fopen
// #define snprintf _snprintf
// #endif
// #ifdef __clang__
// #pragma clang diagnostic ignored "-Wold-style-cast"             // warning : use of old-style cast                              // yes, they are more terse.
// #pragma clang diagnostic ignored "-Wdeprecated-declarations"    // warning : 'xx' is deprecated: The POSIX name for this item.. // for strdup used in demo code (so user can copy & paste the code)
// #pragma clang diagnostic ignored "-Wint-to-void-pointer-cast"   // warning : cast to 'void *' from smaller integer type 'int'
// #pragma clang diagnostic ignored "-Wformat-security"            // warning : warning: format string is not a string literal
// #pragma clang diagnostic ignored "-Wexit-time-destructors"      // warning : declaration requires an exit-time destructor       // exit-time destruction order is undefined. if MemFree() leads to users code that has been disabled before exit it might cause problems. ImGui coding style welcomes static/globals.
// #if __has_warning("-Wreserved-id-macro")
// #pragma clang diagnostic ignored "-Wreserved-id-macro"          // warning : macro name is a reserved identifier                //
// #endif
// #elif defined(__GNUC__)
// #pragma GCC diagnostic ignored "-Wint-to-pointer-cast"          // warning: cast to pointer from integer of different size
// #pragma GCC diagnostic ignored "-Wformat-security"              // warning : format string is not a string literal (potentially insecure)
// #pragma GCC diagnostic ignored "-Wdouble-promotion"             // warning: implicit conversion from 'float' to 'double' when passing argument to function
// #pragma GCC diagnostic ignored "-Wconversion"                   // warning: conversion to 'xxxx' from 'xxxx' may alter its value
// #if (__GNUC__ >= 6)
// #pragma GCC diagnostic ignored "-Wmisleading-indentation"       // warning: this 'if' clause does not guard this statement      // GCC 6.0+ only. See #883 on GitHub.
// #endif
// #endif

// Play it nice with Windows users. Notepad in 2017 still doesn't display text data with Unix-style \n.
// #ifdef _WIN32
// #define IM_NEWLINE "\r\n"
// #else
// #define IM_NEWLINE "\n"
// #endif
const IM_NEWLINE: string = "\n";

// #define IM_MAX(_A,_B)       (((_A) >= (_B)) ? (_A) : (_B))
function IM_MAX(_A: number, _B: number): number { return ((_A) >= (_B)) ? (_A) : (_B); }

//-----------------------------------------------------------------------------
// DEMO CODE
//-----------------------------------------------------------------------------

// #if !defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS) && defined(IMGUI_DISABLE_TEST_WINDOWS) && !defined(IMGUI_DISABLE_DEMO_WINDOWS)   // Obsolete name since 1.53, TEST->DEMO
// #define IMGUI_DISABLE_DEMO_WINDOWS
// #endif

// #if !defined(IMGUI_DISABLE_DEMO_WINDOWS)

class Static<T> {
    constructor(public value: T) {}
}

const _static: {[key: string]: Static<any>} = {};

function STATIC<T>(key: string, value: T): Static<T> {
    return _static[key] || (_static[key] = new Static<T>(value));
}

// static void ShowExampleAppConsole(bool* p_open);
// static void ShowExampleAppLog(bool* p_open);
// static void ShowExampleAppLayout(bool* p_open);
// static void ShowExampleAppPropertyEditor(bool* p_open);
// static void ShowExampleAppLongText(bool* p_open);
// static void ShowExampleAppAutoResize(bool* p_open);
// static void ShowExampleAppConstrainedResize(bool* p_open);
// static void ShowExampleAppFixedOverlay(bool* p_open);
// static void ShowExampleAppWindowTitles(bool* p_open);
// static void ShowExampleAppCustomRendering(bool* p_open);
// static void ShowExampleAppMainMenuBar();
// static void ShowExampleMenuFile();

function ShowHelpMarker(desc: string): void
{
    ImGui.TextDisabled("(?)");
    if (ImGui.IsItemHovered())
    {
        ImGui.BeginTooltip();
        ImGui.PushTextWrapPos(450.0);
        ImGui.TextUnformatted(desc);
        ImGui.PopTextWrapPos();
        ImGui.EndTooltip();
    }
}

export function ShowUserGuide(): void
{
    ImGui.BulletText("Double-click on title bar to collapse window.");
    ImGui.BulletText("Click and drag on lower right corner to resize window\n(double-click to auto fit window to its contents).");
    ImGui.BulletText("Click and drag on any empty space to move window.");
    ImGui.BulletText("TAB/SHIFT+TAB to cycle through keyboard editable fields.");
    ImGui.BulletText("CTRL+Click on a slider or drag box to input value as text.");
    if (ImGui.GetIO().FontAllowUserScaling)
        ImGui.BulletText("CTRL+Mouse Wheel to zoom window contents.");
    ImGui.BulletText("Mouse Wheel to scroll.");
    ImGui.BulletText("While editing text:\n");
    ImGui.Indent();
    ImGui.BulletText("Hold SHIFT or use mouse to select text.");
    ImGui.BulletText("CTRL+Left/Right to word jump.");
    ImGui.BulletText("CTRL+A or double-click to select all.");
    ImGui.BulletText("CTRL+X,CTRL+C,CTRL+V to use clipboard.");
    ImGui.BulletText("CTRL+Z,CTRL+Y to undo/redo.");
    ImGui.BulletText("ESCAPE to revert.");
    ImGui.BulletText("You can apply arithmetic operators +,*,/ on numerical values.\nUse +- to subtract.");
    ImGui.Unindent();
}

// Demonstrate most ImGui features (big function!)
export function ShowDemoWindow(p_open: ImAccess<boolean> | ImScalar<boolean> | null = null): void
{
    // Examples apps
    /* static */ const show_app_main_menu_bar: Static<boolean> = STATIC("show_app_main_menu_bar", false);
    /* static */ const show_app_console: Static<boolean> = STATIC("show_app_console", false);
    /* static */ const show_app_log: Static<boolean> = STATIC("show_app_log", false);
    /* static */ const show_app_layout: Static<boolean> = STATIC("show_app_layout", false);
    /* static */ const show_app_property_editor: Static<boolean> = STATIC("show_app_property_editor", false);
    /* static */ const show_app_long_text: Static<boolean> = STATIC("show_app_long_text", false);
    /* static */ const show_app_auto_resize: Static<boolean> = STATIC("show_app_auto_resize", false);
    /* static */ const show_app_constrained_resize: Static<boolean> = STATIC("show_app_constrained_resize", false);
    /* static */ const show_app_fixed_overlay: Static<boolean> = STATIC("show_app_fixed_overlay", false);
    /* static */ const show_app_window_titles: Static<boolean> = STATIC("show_app_window_titles", false);
    /* static */ const show_app_custom_rendering: Static<boolean> = STATIC("show_app_custom_rendering", false);
    /* static */ const show_app_style_editor: Static<boolean> = STATIC("show_app_style_editor", false);

    /* static */ const show_app_metrics: Static<boolean> = STATIC("show_app_metrics", false);
    /* static */ const show_app_about: Static<boolean> = STATIC("show_app_about", false);

    if (show_app_main_menu_bar.value)       ShowExampleAppMainMenuBar();
    if (show_app_console.value)             ShowExampleAppConsole((value = show_app_console.value) => show_app_console.value = value);
    if (show_app_log.value)                 ShowExampleAppLog((value = show_app_log.value) => show_app_log.value = value);
    if (show_app_layout.value)              ShowExampleAppLayout((value = show_app_layout.value) => show_app_layout.value = value);
    if (show_app_property_editor.value)     ShowExampleAppPropertyEditor((value = show_app_property_editor.value) => show_app_property_editor.value = value);
    if (show_app_long_text.value)           ShowExampleAppLongText((value = show_app_long_text.value) => show_app_long_text.value = value);
    if (show_app_auto_resize.value)         ShowExampleAppAutoResize((value = show_app_auto_resize.value) => show_app_auto_resize.value = value);
    if (show_app_constrained_resize.value)  ShowExampleAppConstrainedResize((value = show_app_constrained_resize.value) => show_app_constrained_resize.value = value);
    if (show_app_fixed_overlay.value)       ShowExampleAppFixedOverlay((value = show_app_fixed_overlay.value) => show_app_fixed_overlay.value = value);
    if (show_app_window_titles.value)       ShowExampleAppWindowTitles((value = show_app_window_titles.value) => show_app_window_titles.value = value);
    if (show_app_custom_rendering.value)    ShowExampleAppCustomRendering((value = show_app_custom_rendering.value) => show_app_custom_rendering.value = value);

    if (show_app_metrics.value)             { ImGui.ShowMetricsWindow((value = show_app_metrics.value) => show_app_metrics.value = value); }
    if (show_app_style_editor.value)        { ImGui.Begin("Style Editor", (value = show_app_style_editor.value) => show_app_style_editor.value = value); /*ImGui.*/ShowStyleEditor(); ImGui.End(); }
    if (show_app_about.value)
    {
        ImGui.Begin("About Dear ImGui", (value = show_app_about.value) => show_app_about.value = value, ImGui.WindowFlags.AlwaysAutoResize);
        ImGui.Text(`dear imgui, ${ImGui.GetVersion()}`);
        ImGui.Separator();
        ImGui.Text("By Omar Cornut and all dear imgui contributors.");
        ImGui.Text("Dear ImGui is licensed under the MIT License, see LICENSE for more information.");
        ImGui.End();
    }

    /* static */ const no_titlebar: Static<boolean> = STATIC("no_titlebar", false);
    /* static */ const no_scrollbar: Static<boolean> = STATIC("no_scrollbar", false);
    /* static */ const no_menu: Static<boolean> = STATIC("no_menu", false);
    /* static */ const no_move: Static<boolean> = STATIC("no_move", false);
    /* static */ const no_resize: Static<boolean> = STATIC("no_resize", false);
    /* static */ const no_collapse: Static<boolean> = STATIC("no_collapse", false);
    /* static */ const no_close: Static<boolean> = STATIC("no_close", false);

    // Demonstrate the various window flags. Typically you would just use the default.
    let window_flags: ImGui.WindowFlags = 0;
    if (no_titlebar.value)  window_flags |= ImGuiWindowFlags.NoTitleBar;
    if (no_scrollbar.value) window_flags |= ImGuiWindowFlags.NoScrollbar;
    if (!no_menu.value)     window_flags |= ImGuiWindowFlags.MenuBar;
    if (no_move.value)      window_flags |= ImGuiWindowFlags.NoMove;
    if (no_resize.value)    window_flags |= ImGuiWindowFlags.NoResize;
    if (no_collapse.value)  window_flags |= ImGuiWindowFlags.NoCollapse;
    if (no_close.value)     p_open = null; // Don't pass our bool* to Begin

    ImGui.SetNextWindowSize(new ImVec2(550,680), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("ImGui Demo", p_open, window_flags))
    {
        // Early out if the window is collapsed, as an optimization.
        ImGui.End();
        return;
    }

    //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // 2/3 of the space for widget and 1/3 for labels
    ImGui.PushItemWidth(-140);                                 // Right align, keep 140 pixels for labels

    ImGui.Text(`dear imgui says hello. (${IMGUI_VERSION})`);

    // Menu
    if (ImGui.BeginMenuBar())
    {
        if (ImGui.BeginMenu("Menu"))
        {
            ShowExampleMenuFile();
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Examples"))
        {
            ImGui.MenuItem("Main menu bar", null, (value = show_app_main_menu_bar.value) => show_app_main_menu_bar.value = value);
            ImGui.MenuItem("Console", null, (value = show_app_console.value) => show_app_console.value = value);
            ImGui.MenuItem("Log", null, (value = show_app_log.value) => show_app_log.value = value);
            ImGui.MenuItem("Simple layout", null, (value = show_app_layout.value) => show_app_layout.value = value);
            ImGui.MenuItem("Property editor", null, (value = show_app_property_editor.value) => show_app_property_editor.value = value);
            ImGui.MenuItem("Long text display", null, (value = show_app_long_text.value) => show_app_long_text.value = value);
            ImGui.MenuItem("Auto-resizing window", null, (value = show_app_auto_resize.value) => show_app_auto_resize.value = value);
            ImGui.MenuItem("Constrained-resizing window", null, (value = show_app_constrained_resize.value) => show_app_constrained_resize.value = value);
            ImGui.MenuItem("Simple overlay", null, (value = show_app_fixed_overlay.value) => show_app_fixed_overlay.value = value);
            ImGui.MenuItem("Manipulating window titles", null, (value = show_app_window_titles.value) => show_app_window_titles.value = value);
            ImGui.MenuItem("Custom rendering", null, (value = show_app_custom_rendering.value) => show_app_custom_rendering.value = value);
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Help"))
        {
            ImGui.MenuItem("Metrics", null, (value = show_app_metrics.value) => show_app_metrics.value = value);
            ImGui.MenuItem("Style Editor", null, (value = show_app_style_editor.value) => show_app_style_editor.value = value);
            ImGui.MenuItem("About Dear ImGui", null, (value = show_app_about.value) => show_app_about.value = value);
            ImGui.EndMenu();
        }
        ImGui.EndMenuBar();
    }

    ImGui.Spacing();
    if (ImGui.CollapsingHeader("Help"))
    {
        ImGui.TextWrapped("This window is being created by the ShowDemoWindow() function. Please refer to the code in imgui_demo.ts for reference.\n\n");
        ImGui.Text("USER GUIDE:");
        /*ImGui.*/ShowUserGuide();
    }

    if (ImGui.CollapsingHeader("Window options"))
    {
        ImGui.Checkbox("No titlebar", (value = no_titlebar.value) => no_titlebar.value = value); ImGui.SameLine(150);
        ImGui.Checkbox("No scrollbar", (value = no_scrollbar.value) => no_scrollbar.value = value); ImGui.SameLine(300);
        ImGui.Checkbox("No menu", (value = no_menu.value) => no_menu.value = value);
        ImGui.Checkbox("No move", (value = no_move.value) => no_move.value = value); ImGui.SameLine(150);
        ImGui.Checkbox("No resize", (value = no_resize.value) => no_resize.value = value); ImGui.SameLine(300);
        ImGui.Checkbox("No collapse", (value = no_collapse.value) => no_collapse.value = value);
        ImGui.Checkbox("No close", (value = no_close.value) => no_close.value = value);

        if (ImGui.TreeNode("Style"))
        {
            /*ImGui.*/ShowStyleEditor();
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Capture/Logging"))
        {
            ImGui.TextWrapped("The logging API redirects all text output so you can easily capture the content of a window or a block. Tree nodes can be automatically expanded. You can also call ImGui.LogText() to output directly to the log without a visual output.");
            ImGui.LogButtons();
            ImGui.TreePop();
        }
    }

    if (ImGui.CollapsingHeader("Widgets"))
    {
        if (ImGui.TreeNode("Basic"))
        {
            /* static */ const clicked: Static<number> = STATIC("clicked", 0);
            if (ImGui.Button("Button")) 
                clicked.value++;
            if (clicked.value & 1)
            {
                ImGui.SameLine();
                ImGui.Text("Thanks for clicking me!");
            }

            /* static */ const check: Static<boolean> = STATIC("check", true);
            ImGui.Checkbox("checkbox", (value = check.value) => check.value = value);

            /* static */ const e: Static<number> = STATIC("e", 0);
            ImGui.RadioButton("radio a", (value = e.value) => e.value = value, 0); ImGui.SameLine();
            ImGui.RadioButton("radio b", (value = e.value) => e.value = value, 1); ImGui.SameLine();
            ImGui.RadioButton("radio c", (value = e.value) => e.value = value, 2);

            // Color buttons, demonstrate using PushID() to add unique identifier in the ID stack, and changing style.
            for (let i = 0; i < 7; i++)
            {
                if (i > 0) ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(ImGuiCol.Button, ImColor.HSV(i/7.0, 0.6, 0.6));
                ImGui.PushStyleColor(ImGuiCol.ButtonHovered, ImColor.HSV(i/7.0, 0.7, 0.7));
                ImGui.PushStyleColor(ImGuiCol.ButtonActive, ImColor.HSV(i/7.0, 0.8, 0.8));
                ImGui.Button("Click");
                ImGui.PopStyleColor(3);
                ImGui.PopID();
            }

            ImGui.Text("Hover over me");
            if (ImGui.IsItemHovered())
                ImGui.SetTooltip("I am a tooltip");

            ImGui.SameLine();
            ImGui.Text("- or me");
            if (ImGui.IsItemHovered())
            {
                ImGui.BeginTooltip();
                ImGui.Text("I am a fancy tooltip");
                /* static */ const arr: Static<number[]> = STATIC("arr_", [ 0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2 ]);
                // ImGui.PlotLines("Curve", arr, IM_ARRAYSIZE(arr));
                ImGui.PlotLines_Array("Curve", arr.value, IM_ARRAYSIZE(arr.value));
                ImGui.EndTooltip();
            }

            // Testing ImGuiOnceUponAFrame helper.
            //static ImGuiOnceUponAFrame once;
            //for (let i = 0; i < 5; i++)
            //    if (once)
            //        ImGui.Text("This will be displayed only once.");

            ImGui.Separator();

            ImGui.LabelText("label", "Value");

            {
                // Simplified one-liner Combo() API, using values packed in a single constant string
                /* static */ const current_item_1: Static<number> = STATIC("current_item_1", 1);
                ImGui.Combo("combo", (value = current_item_1.value) => current_item_1.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                //ImGui.Combo("combo w/ array of char*", &current_item_2_idx, items, IM_ARRAYSIZE(items));   // Combo using proper array. You can also pass a callback to retrieve array value, no need to create/copy an array just for that.

                // General BeginCombo() API, you have full control over your selection data and display type
                const items: string[] = [ "AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO", "PPPP", "QQQQQQQQQQ", "RRR", "SSSS" ];
                /* static */ const current_item_2: Static<string | null> = STATIC("current_item_2", null);
                if (ImGui.BeginCombo("combo 2", current_item_2.value)) // The second parameter is the label previewed before opening the combo.
                {
                    for (let n = 0; n < IM_ARRAYSIZE(items); n++)
                    {
                        const is_selected: boolean = (current_item_2.value === items[n]); // You can store your selection however you want, outside or inside your objects
                        if (ImGui.Selectable(items[n], is_selected))
                            current_item_2.value = items[n];
                        if (is_selected)
                            ImGui.SetItemDefaultFocus();   // Set the initial focus when opening the combo (scrolling + for keyboard navigation support in the upcoming navigation branch)
                    }
                    ImGui.EndCombo();
                }
            }

            {
                /* static */ const str0: Static<ImStringBuffer> = STATIC("str0", new ImStringBuffer(128, "Hello, world!"));
                /* static */ const i0: Static<number> = STATIC("i0", 123);
                /* static */ const f0: Static<number> = STATIC("f0#400", 0.001);
                ImGui.InputText("input text", str0.value, IM_ARRAYSIZE(str0.value));
                ImGui.SameLine(); ShowHelpMarker("Hold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n");

                ImGui.InputInt("input int", (value = i0.value) => i0.value = value);
                ImGui.SameLine(); ShowHelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\nUse +- to subtract.\n");

                ImGui.InputFloat("input float", (value = f0.value) => f0.value = value, 0.01, 1.0);

                /* static */ const vec4a: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4a", [ 0.10, 0.20, 0.30, 0.44 ]);
                ImGui.InputFloat3("input float3", vec4a.value);
            }

            {
                /* static */ const i1: Static<number> = STATIC("i1#415", 50), i2: Static<number> = STATIC("i2#415", 42);
                ImGui.DragInt("drag int", (value = i1.value) => i1.value = value, 1);
                ImGui.SameLine(); ShowHelpMarker("Click and drag to edit value.\nHold SHIFT/ALT for faster/slower edit.\nDouble-click or CTRL+click to input value.");

                ImGui.DragInt("drag int 0..100", (value = i2.value) => i2.value = value, 1, 0, 100, "%.0f%%");

                /* static */ const f1: Static<number> = STATIC("f1#421", 1.00), f2: Static<number> = STATIC("f2#421", 0.0067);
                ImGui.DragFloat("drag float", (value = f1.value) => f1.value = value, 0.005);
                ImGui.DragFloat("drag small float", (value = f2.value) => f2.value = value, 0.0001, 0.0, 0.0, "%.06f ns");
            }

            {
                /* static */ const i1: Static<number> = STATIC("i1#427", 0);
                ImGui.SliderInt("slider int", (value = i1.value) => i1.value = value, -1, 3);
                ImGui.SameLine(); ShowHelpMarker("CTRL+click to input value.");

                /* static */ const f1: Static<number> = STATIC("f1#427", 0.123), f2: Static<number> = STATIC("f2#427", 0.0);
                ImGui.SliderFloat("slider float", (value = f1.value) => f1.value = value, 0.0, 1.0, "ratio = %.3f");
                ImGui.SliderFloat("slider log float", (value = f2.value) => f2.value = value, -10.0, 10.0, "%.4f", 3.0);
                /* static */ const angle: Static<number> = STATIC("angle", 0.0);
                ImGui.SliderAngle("slider angle", (value = angle.value) => angle.value = value);
            }

            /* static */ const col1: Static<ImTuple3<number>> = STATIC<ImTuple3<number>>("col1", [ 1.0,0.0,0.2 ]);
            /* static */ const col2: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("col2", [ 0.4,0.7,0.0,0.5 ]);
            ImGui.ColorEdit3("color 1", col1.value);
            ImGui.SameLine(); ShowHelpMarker("Click on the colored square to open a color picker.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");

            ImGui.ColorEdit4("color 2", col2.value);

            const listbox_items: string[] = [ "Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon" ];
            /* static */ const listbox_item_current: Static<number> = STATIC("listbox_item_current", 1);
            ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, IM_ARRAYSIZE(listbox_items), 4);

            /* static */ const listbox_item_current2: Static<number> = STATIC("listbox_item_current2", 2);
            ImGui.PushItemWidth(-1);
            ImGui.ListBox("##listbox2", (value = listbox_item_current2.value) => listbox_item_current2.value = value, listbox_items, IM_ARRAYSIZE(listbox_items), 4);
            ImGui.PopItemWidth();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Trees"))
        {
            if (ImGui.TreeNode("Basic trees"))
            {
                for (let i = 0; i < 5; i++)
                    if (ImGui.TreeNode(i.toString(), `Child ${i}`))
                    {
                        ImGui.Text("blah blah");
                        ImGui.SameLine(); 
                        if (ImGui.SmallButton("print")) console.log(`Child ${i} pressed`);
                        ImGui.TreePop();
                    }
                ImGui.TreePop();
            }

            if (ImGui.TreeNode("Advanced, with Selectable nodes"))
            {
                ShowHelpMarker("This is a more standard looking tree with selectable nodes.\nClick to select, CTRL+Click to toggle, click on arrows or double-click to open.");
                /* static */ const align_label_with_current_x_position: Static<boolean> = STATIC("align_label_with_current_x_position", false);
                ImGui.Checkbox("Align label with current X position)", (value = align_label_with_current_x_position.value) => align_label_with_current_x_position.value = value);
                ImGui.Text("Hello!");
                if (align_label_with_current_x_position.value)
                    ImGui.Unindent(ImGui.GetTreeNodeToLabelSpacing());

                /* static */ const selection_mask: Static<number> = STATIC("selection_mask", (1 << 2)); // Dumb representation of what may be user-side selection state. You may carry selection state inside or outside your objects in whatever format you see fit.
                let node_clicked: number = -1;                // Temporary storage of what node we have clicked to process selection at the end of the loop. May be a pointer to your own node type, etc.
                ImGui.PushStyleVar(ImGuiStyleVar.IndentSpacing, ImGui.GetFontSize()*3); // Increase spacing to differentiate leaves from expanded contents.
                for (let i = 0; i < 6; i++)
                {
                    // Disable the default open on single-click behavior and pass in Selected flag according to our selection state.
                    let node_flags: ImGuiTreeNodeFlags = ImGuiTreeNodeFlags.OpenOnArrow | ImGuiTreeNodeFlags.OpenOnDoubleClick | ((selection_mask.value & (1 << i)) ? ImGuiTreeNodeFlags.Selected : 0);
                    if (i < 3)
                    {
                        // Node
                        const node_open: boolean = ImGui.TreeNodeEx(i, node_flags, `Selectable Node ${i}`);
                        if (ImGui.IsItemClicked()) 
                            node_clicked = i;
                        if (node_open)
                        {
                            ImGui.Text("Blah blah\nBlah Blah");
                            ImGui.TreePop();
                        }
                    }
                    else
                    {
                        // Leaf: The only reason we have a TreeNode at all is to allow selection of the leaf. Otherwise we can use BulletText() or TreeAdvanceToLabelPos()+Text().
                        node_flags |= ImGuiTreeNodeFlags.Leaf | ImGuiTreeNodeFlags.NoTreePushOnOpen; // ImGuiTreeNodeFlags.Bullet
                        ImGui.TreeNodeEx(i, node_flags, `Selectable Leaf ${i}`);
                        if (ImGui.IsItemClicked())
                            node_clicked = i;
                    }
                }
                if (node_clicked !== -1)
                {
                    // Update selection state. Process outside of tree loop to avoid visual inconsistencies during the clicking-frame.
                    if (ImGui.GetIO().KeyCtrl)
                        selection_mask.value ^= (1 << node_clicked);          // CTRL+click to toggle
                    else //if (!(selection_mask & (1 << node_clicked))) // Depending on selection behavior you want, this commented bit preserve selection when clicking on item that is part of the selection
                        selection_mask.value = (1 << node_clicked);           // Click to single-select
                }
                ImGui.PopStyleVar();
                if (align_label_with_current_x_position)
                    ImGui.Indent(ImGui.GetTreeNodeToLabelSpacing());
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Collapsing Headers"))
        {
            /* static */ const closable_group: Static<boolean> = STATIC("closable_group", true);
            ImGui.Checkbox("Enable extra group", (value = closable_group.value) => closable_group.value = value);
            if (ImGui.CollapsingHeader("Header"))
            {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`Some content ${i}`);
            }
            if (ImGui.CollapsingHeader("Header with a close button", (value = closable_group.value) => closable_group.value = value))
            {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`More content ${i}`);
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Bullets"))
        {
            ImGui.BulletText("Bullet point 1");
            ImGui.BulletText("Bullet point 2\nOn multiple lines");
            ImGui.Bullet(); ImGui.Text("Bullet point 3 (two calls)");
            ImGui.Bullet(); ImGui.SmallButton("Button");
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Text"))
        {
            if (ImGui.TreeNode("Colored Text"))
            {
                // Using shortcut. You can use PushStyleColor()/PopStyleColor() for more flexibility.
                ImGui.TextColored(new ImVec4(1.0,0.0,1.0,1.0), "Pink");
                ImGui.TextColored(new ImVec4(1.0,1.0,0.0,1.0), "Yellow");
                ImGui.TextDisabled("Disabled");
                ImGui.SameLine(); ShowHelpMarker("The TextDisabled color is stored in ImGuiStyle.");
                ImGui.TreePop();
            }

            if (ImGui.TreeNode("Word Wrapping"))
            {
                // Using shortcut. You can use PushTextWrapPos()/PopTextWrapPos() for more flexibility.
                ImGui.TextWrapped("This text should automatically wrap on the edge of the window. The current implementation for text wrapping follows simple rules suitable for English and possibly other languages.");
                ImGui.Spacing();

                /* static */ const wrap_width: Static<number> = STATIC("wrap_width", 200.0);
                ImGui.SliderFloat("Wrap width", (value = wrap_width.value) => wrap_width.value = value, -20, 600, "%.0f");

                ImGui.Text("Test paragraph 1:");
                let pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new ImVec2(pos.x + wrap_width.value, pos.y), new ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), IM_COL32(255,0,255,255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), IM_COL32(255,255,0,255));
                ImGui.PopTextWrapPos();

                ImGui.Text("Test paragraph 2:");
                pos = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new ImVec2(pos.x + wrap_width.value, pos.y), new ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), IM_COL32(255,0,255,255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), IM_COL32(255,255,0,255));
                ImGui.PopTextWrapPos();

                ImGui.TreePop();
            }

            if (ImGui.TreeNode("UTF-8 Text"))
            {
                // UTF-8 test with Japanese characters
                // (needs a suitable font, try Arial Unicode or M+ fonts http://mplus-fonts.sourceforge.jp/mplus-outline-fonts/index-en.html)
                // - From C++11 you can use the u8"my text" syntax to encode literal strings as UTF-8
                // - For earlier compiler, you may be able to encode your sources as UTF-8 (e.g. Visual Studio save your file as 'UTF-8 without signature')
                // - HOWEVER, FOR THIS DEMO FILE, BECAUSE WE WANT TO SUPPORT COMPILER, WE ARE *NOT* INCLUDING RAW UTF-8 CHARACTERS IN THIS SOURCE FILE.
                //   Instead we are encoding a few string with hexadecimal constants. Don't do this in your application!
                // Note that characters values are preserved even by InputText() if the font cannot be displayed, so you can safely copy & paste garbled characters into another application.
                ImGui.TextWrapped("CJK text will only appears if the font was loaded with the appropriate CJK character ranges. Call io.Font->LoadFromFileTTF() manually to load extra character ranges.");
                ImGui.Text("Hiragana: \xe3\x81\x8b\xe3\x81\x8d\xe3\x81\x8f\xe3\x81\x91\xe3\x81\x93 (kakikukeko)");
                ImGui.Text("Kanjis: \xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e (nihongo)");
                /* static */ const buf: Static<ImStringBuffer> = STATIC("buf", new ImStringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e")); // "nihongo"
                ImGui.InputText("UTF-8 input", buf.value, IM_ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Images"))
        {
            ImGui.TextWrapped("Below we are displaying the font texture (which is the only texture we have access to in this demo). Use the 'ImTextureID' type as storage to pass pointers or identifier to your own texture data. Hover the texture for a zoomed view!");
            const io: ImGuiIO = ImGui.GetIO();

            // Here we are grabbing the font texture because that's the only one we have access to inside the demo code.
            // Remember that ImTextureID is just storage for whatever you want it to be, it is essentially a value that will be passed to the render function inside the ImDrawCmd structure.
            // If you use one of the default imgui_impl_XXXX.cpp renderer, they all have comments at the top of their file to specify what they expect to be stored in ImTextureID.
            // (for example, the imgui_impl_dx11.cpp renderer expect a 'ID3D11ShaderResourceView*' pointer. The imgui_impl_glfw_gl3.cpp renderer expect a GLuint OpenGL texture identifier etc.)
            // If you decided that ImTextureID = MyEngineTexture*, then you can pass your MyEngineTexture* pointers to ImGui.Image(), and gather width/height through your own functions, etc.
            // Using ShowMetricsWindow() as a "debugger" to inspect the draw data that are being passed to your render will help you debug issues if you are confused about this.
            // Consider using the lower-level ImDrawList::AddImage() API, via ImGui.GetWindowDrawList()->AddImage().
            const my_tex_id: WebGLTexture | null = io.Fonts.TexID;
            const my_tex_w: number = io.Fonts.TexWidth;
            const my_tex_h: number = io.Fonts.TexHeight;

            ImGui.Text(`${my_tex_w.toFixed(0)}x${my_tex_h.toFixed(0)}`);
            const pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
            ImGui.Image(my_tex_id, new ImVec2(my_tex_w, my_tex_h), new ImVec2(0,0), new ImVec2(1,1), new ImVec4(1.0,1.0,1.0,1.0), new ImVec4(1.0,1.0,1.0,0.5));
            if (ImGui.IsItemHovered())
            {
                ImGui.BeginTooltip();
                const focus_sz: number = 32.0;
                let focus_x = io.MousePos.x - pos.x - focus_sz * 0.5; if (focus_x < 0.0) focus_x = 0.0; else if (focus_x > my_tex_w - focus_sz) focus_x = my_tex_w - focus_sz;
                let focus_y = io.MousePos.y - pos.y - focus_sz * 0.5; if (focus_y < 0.0) focus_y = 0.0; else if (focus_y > my_tex_h - focus_sz) focus_y = my_tex_h - focus_sz;
                ImGui.Text(`Min: (${focus_x.toFixed(2)}, ${focus_y.toFixed(2)})`);
                ImGui.Text(`Max: (${(focus_x + focus_sz).toFixed(2)}, ${(focus_y + focus_sz).toFixed(2)})`);
                const uv0: ImVec2 = new ImVec2((focus_x) / my_tex_w, (focus_y) / my_tex_h);
                const uv1: ImVec2 = new ImVec2((focus_x + focus_sz) / my_tex_w, (focus_y + focus_sz) / my_tex_h);
                // ImGui.Image(my_tex_id, ImVec2(128,128), uv0, uv1, ImColor(255,255,255,255), ImColor(255,255,255,128));
                ImGui.Image(my_tex_id, new ImVec2(128,128), uv0, uv1, new ImVec4(1.0,1.0,1.0,1.0), new ImVec4(1.0,1.0,1.0,0.5));
                ImGui.EndTooltip();
            }
            ImGui.TextWrapped("And now some textured buttons..");
            /* static */ const pressed_count: Static<number> = STATIC("pressed_count", 0);
            for (let i = 0; i < 8; i++)
            {
                ImGui.PushID(i);
                let frame_padding: number = -1 + i;     // -1 = uses default padding
                if (ImGui.ImageButton(my_tex_id, new ImVec2(32,32), new ImVec2(0,0), new ImVec2(32.0/my_tex_w,32/my_tex_h), frame_padding, new ImVec4(0,0,0,1)))
                    pressed_count.value += 1;
                ImGui.PopID();
                ImGui.SameLine();
            }
            ImGui.NewLine();
            ImGui.Text(`Pressed ${pressed_count} times.`);
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Selectables"))
        {
            if (ImGui.TreeNode("Basic"))
            {
                /* static */ const selected: Static<boolean[/*4*/]> = STATIC("selected#672", [ false, true, false, false ]);
                ImGui.Selectable("1. I am selectable", (value = selected.value[0]) => selected.value[0] = value);
                ImGui.Selectable("2. I am selectable", (value = selected.value[1]) => selected.value[1] = value);
                ImGui.Text("3. I am not selectable");
                ImGui.Selectable("4. I am selectable", (value = selected.value[2]) => selected.value[2] = value);
                if (ImGui.Selectable("5. I am double clickable", selected.value[3], ImGuiSelectableFlags.AllowDoubleClick))
                    if (ImGui.IsMouseDoubleClicked(0))
                        selected.value[3] = !selected.value[3];
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Rendering more text into the same block"))
            {
                /* static */ const selected: Static<boolean[/*3*/]> = STATIC("selected#687", [ false, false, false ]);
                ImGui.Selectable("main.c", (value = selected.value[0]) => selected.value[0] = value);    ImGui.SameLine(300); ImGui.Text(" 2,345 bytes");
                ImGui.Selectable("Hello.cpp", (value = selected.value[1]) => selected.value[1] = value); ImGui.SameLine(300); ImGui.Text("12,345 bytes");
                ImGui.Selectable("Hello.h", (value = selected.value[2]) => selected.value[2] = value);   ImGui.SameLine(300); ImGui.Text(" 2,345 bytes");
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("In columns"))
            {
                ImGui.Columns(3, null, false);
                /* static */ const selected: Static<boolean[/*16*/]> = STATIC("selected#699", new Array(16).fill(false));
                for (let i = 0; i < 16; i++)
                {
                    const label: string = `Item ${i}`;
                    if (ImGui.Selectable(label, (value = selected.value[i]) => selected.value[i] = value)) {}
                    ImGui.NextColumn();
                }
                ImGui.Columns(1);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Grid"))
            {
                /* static */ const selected: Static<boolean[/*16*/]> = STATIC("selected#712", [ true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true ]);
                for (let i = 0; i < 16; i++)
                {
                    ImGui.PushID(i);
                    if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new ImVec2(50,50)))
                    {
                        let x: number = i % 4, y: number = i / 4;
                        if (x > 0) selected.value[i - 1] = !selected.value[i - 1];
                        if (x < 3) selected.value[i + 1] = !selected.value[i + 1];
                        if (y > 0) selected.value[i - 4] = !selected.value[i - 4];
                        if (y < 3) selected.value[i + 4] = !selected.value[i + 4];
                    }
                    if ((i % 4) < 3) ImGui.SameLine();
                    ImGui.PopID();
                }
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Filtered Text Input"))
        {
            /* static */ const buf1: Static<ImStringBuffer> = STATIC("buf1", new ImStringBuffer(64, "")); ImGui.InputText("default", buf1.value, IM_ARRAYSIZE(buf1.value));
            /* static */ const buf2: Static<ImStringBuffer> = STATIC("buf2", new ImStringBuffer(64, "")); ImGui.InputText("decimal", buf2.value, IM_ARRAYSIZE(buf2.value), ImGuiInputTextFlags.CharsDecimal);
            /* static */ const buf3: Static<ImStringBuffer> = STATIC("buf3", new ImStringBuffer(64, "")); ImGui.InputText("hexadecimal", buf3.value, IM_ARRAYSIZE(buf3.value), ImGuiInputTextFlags.CharsHexadecimal | ImGuiInputTextFlags.CharsUppercase);
            /* static */ const buf4: Static<ImStringBuffer> = STATIC("buf4", new ImStringBuffer(64, "")); ImGui.InputText("uppercase", buf4.value, IM_ARRAYSIZE(buf4.value), ImGuiInputTextFlags.CharsUppercase);
            /* static */ const buf5: Static<ImStringBuffer> = STATIC("buf5", new ImStringBuffer(64, "")); ImGui.InputText("no blank", buf5.value, IM_ARRAYSIZE(buf5.value), ImGuiInputTextFlags.CharsNoBlank);
            class TextFilters { public static FilterImGuiLetters(data: ImGuiTextEditCallbackData): number { if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar))) return 0; return 1; } }
            /* static */ const buf6: Static<ImStringBuffer> = STATIC("buf6", new ImStringBuffer(64, "")); ImGui.InputText("\"imgui\" letters", buf6.value, IM_ARRAYSIZE(buf6.value), ImGuiInputTextFlags.CallbackCharFilter, TextFilters.FilterImGuiLetters);

            ImGui.Text("Password input");
            /* static */ const bufpass: Static<ImStringBuffer> = STATIC("bufpass", new ImStringBuffer(64, "password123"));
            ImGui.InputText("password", bufpass.value, IM_ARRAYSIZE(bufpass.value), ImGuiInputTextFlags.Password | ImGuiInputTextFlags.CharsNoBlank);
            ImGui.SameLine(); ShowHelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
            ImGui.InputText("password (clear)", bufpass.value, IM_ARRAYSIZE(bufpass.value), ImGuiInputTextFlags.CharsNoBlank);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Multi-line Text Input"))
        {
            /* static */ const read_only: Static<boolean> = STATIC("read_only", false);
            /* static */ const text: Static<ImStringBuffer> = STATIC("text", new ImStringBuffer(1024*16, 
                "/*\n" +
                " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
                " the hexadecimal encoding of one offending instruction,\n" +
                " more formally, the invalid operand with locked CMPXCHG8B\n" +
                " instruction bug, is a design flaw in the majority of\n" +
                " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
                " processors (all in the P5 microarchitecture).\n" +
                "*/\n\n" +
                "label:\n" +
                "\tlock cmpxchg8b eax\n"));

            ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0,0));
            ImGui.Checkbox("Read-only", (value = read_only.value) => read_only.value = value);
            ImGui.PopStyleVar();
            ImGui.InputTextMultiline("##source", text.value, IM_ARRAYSIZE(text.value), new ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), ImGuiInputTextFlags.AllowTabInput | (read_only.value ? ImGuiInputTextFlags.ReadOnly : 0));
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Plots widgets"))
        {
            /* static */ const animate: Static<boolean> = STATIC("animate", true);
            ImGui.Checkbox("Animate", (value = animate.value) => animate.value = value);

            /* static */ const arr: Static<number[]> = STATIC("arr", [ 0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2 ]);
            ImGui.PlotLines_Array("Frame Times", arr.value, IM_ARRAYSIZE(arr.value));

            // Create a dummy array of contiguous float values to plot
            // Tip: If your float aren't contiguous but part of a structure, you can pass a pointer to your first float and the sizeof() of your structure in the Stride parameter.
            /* static */ const values: Static<number[/*90*/]> = STATIC("values#803", new Array(90).fill(0));
            /* static */ const values_offset: Static<number> = STATIC("values_offset", 0);
            /* static */ const refresh_time: Static<number> = STATIC("refresh_time", 0.0);
            if (!animate.value || refresh_time.value === 0.0)
                refresh_time.value = ImGui.GetTime();
            while (refresh_time.value < ImGui.GetTime()) // Create dummy data at fixed 60 hz rate for the demo
            {
                /* static */ const phase: Static<number> = STATIC("phase", 0.0);
                values.value[values_offset.value] = Math.cos(phase.value);
                values_offset.value = (values_offset.value+1) % IM_ARRAYSIZE(values.value);
                phase.value += 0.10*values_offset.value;
                refresh_time.value += 1.0/60.0;
            }
            ImGui.PlotLines_Array("Lines", values.value, IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new ImVec2(0,80));
            ImGui.PlotHistogram_Array("Histogram", arr.value, IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new ImVec2(0,80));

            // Use functions to generate output
            // FIXME: This is rather awkward because current plot API only pass in indices. We probably want an API passing floats and user provide sample rate/count.
            class Funcs
            {
                public static Sin(data: any, i: number): number { return Math.sin(i * 0.1); }
                public static Saw(data: any, i: number): number { return (i & 1) ? 1.0 : -1.0; }
            }
            /* static */ const func_type: Static<number> = STATIC("func_type", 0), display_count: Static<number> = STATIC("display_count", 70);
            ImGui.Separator();
            ImGui.PushItemWidth(100); ImGui.Combo("func", (value = func_type.value) => func_type.value = value, "Sin\0Saw\0"); ImGui.PopItemWidth();
            ImGui.SameLine();
            ImGui.SliderInt("Sample count", (value = display_count.value) => display_count.value = value, 1, 400);
            const func: (data: any, i: number) => number = (func_type.value === 0) ? Funcs.Sin : Funcs.Saw;
            ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new ImVec2(0,80));
            ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new ImVec2(0,80));
            ImGui.Separator();

            // Animate a simple progress bar
            /* static */ const progress: Static<number> = STATIC("progress", 0.0), progress_dir: Static<number> = STATIC("progress_dir", 1.0);
            if (animate.value)
            {
                progress.value += progress_dir.value * 0.4 * ImGui.GetIO().DeltaTime;
                if (progress.value >= +1.1) { progress.value = +1.1; progress_dir.value *= -1.0; }
                if (progress.value <= -0.1) { progress.value = -0.1; progress_dir.value *= -1.0; }
            }

            // Typically we would use ImVec2(-1.0f,0.0) to use all available width, or ImVec2(width,0.0) for a specified width. ImVec2(0.0,0.0) uses ItemWidth.
            ImGui.ProgressBar(progress.value, new ImVec2(0.0,0.0));
            ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
            ImGui.Text("Progress Bar");

            const progress_saturated: number = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
            const buf: string = `${(progress_saturated*1753).toFixed(0)}/${1753}`;
            ImGui.ProgressBar(progress.value, new ImVec2(0.,0.), buf);
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Color/Picker Widgets"))
        {
            /* static */ const color: Static<ImVec4> = STATIC("color#863", new ImColor(114, 144, 154, 200).toImVec4());

            /* static */ const hdr: Static<boolean> = STATIC("hdr", false);
            /* static */ const alpha_preview: Static<boolean> = STATIC("alpha_preview", true);
            /* static */ const alpha_half_preview: Static<boolean> = STATIC("alpha_half_preview", false);
            /* static */ const options_menu: Static<boolean> = STATIC("options_menu", true);
            ImGui.Checkbox("With HDR", (value = hdr.value) => hdr.value = value); ImGui.SameLine(); ShowHelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
            ImGui.Checkbox("With Alpha Preview", (value = alpha_preview.value) => alpha_preview.value = value);
            ImGui.Checkbox("With Half Alpha Preview", (value = alpha_half_preview.value) => alpha_half_preview.value = value);
            ImGui.Checkbox("With Options Menu", (value = options_menu.value) => options_menu.value = value); ImGui.SameLine(); ShowHelpMarker("Right-click on the individual color widget to show options.");
            const misc_flags: ImGuiColorEditFlags = (hdr.value ? ImGuiColorEditFlags.HDR : 0) | (alpha_half_preview.value ? ImGuiColorEditFlags.AlphaPreviewHalf : (alpha_preview.value ? ImGuiColorEditFlags.AlphaPreview : 0)) | (options_menu.value ? 0 : ImGuiColorEditFlags.NoOptions);

            ImGui.Text("Color widget:");
            ImGui.SameLine(); ShowHelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
            ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);

            ImGui.Text("Color widget HSV with Alpha:");
            ImGui.ColorEdit4("MyColor##2", color.value, ImGuiColorEditFlags.HSV | misc_flags);

            ImGui.Text("Color widget with Float Display:");
            ImGui.ColorEdit4("MyColor##2f", color.value, ImGuiColorEditFlags.Float | misc_flags);

            ImGui.Text("Color button with Picker:");
            ImGui.SameLine(); ShowHelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
            ImGui.ColorEdit4("MyColor##3", color.value, ImGuiColorEditFlags.NoInputs | ImGuiColorEditFlags.NoLabel | misc_flags);

            ImGui.Text("Color button with Custom Picker Popup:");

            // Generate a dummy palette
            /* static */ const saved_palette_inited: Static<boolean> = STATIC("saved_palette_inited", false);
            /* static */ const saved_palette: Static<ImVec4[/*32*/]> = STATIC("saved_palette", []);
            if (!saved_palette_inited.value)
                for (let n = 0; n < 32; n++)
                {
                    saved_palette.value[n] = new ImVec4();
                    // ImGui.ColorConvertHSVtoRGB(n / 31.0f, 0.8f, 0.8f, saved_palette[n].x, saved_palette[n].y, saved_palette[n].z);
                    const r: ImScalar<number> = [ 0.0 ];
                    const g: ImScalar<number> = [ 0.0 ];
                    const b: ImScalar<number> = [ 0.0 ];
                    ImGui.ColorConvertHSVtoRGB(n / 32.0, 0.8, 0.8, r, g, b);
                    saved_palette.value[n].x = r[0];
                    saved_palette.value[n].y = g[0];
                    saved_palette.value[n].z = b[0];
                    saved_palette.value[n].w = 1.0; // Alpha
                }
            saved_palette_inited.value = true;

            /* static */ const backup_color: Static<ImVec4> = STATIC("backup_color", new ImVec4());
            let open_popup: boolean = ImGui.ColorButton("MyColor##3b", color.value, misc_flags);
            ImGui.SameLine();
            open_popup = open_popup || ImGui.Button("Palette");
            if (open_popup)
            {
                ImGui.OpenPopup("mypicker");
                    backup_color.value.Copy(color.value);
            }
            if (ImGui.BeginPopup("mypicker"))
            {
                // FIXME: Adding a drag and drop example here would be perfect!
                ImGui.Text("MY CUSTOM COLOR PICKER WITH AN AMAZING PALETTE!");
                ImGui.Separator();
                ImGui.ColorPicker4("##picker", color.value, misc_flags | ImGuiColorEditFlags.NoSidePreview | ImGuiColorEditFlags.NoSmallPreview);
                ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text("Current");
                ImGui.ColorButton("##current", color.value, ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.AlphaPreviewHalf, new ImVec2(60,40));
                ImGui.Text("Previous");
                if (ImGui.ColorButton("##previous", backup_color.value, ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.AlphaPreviewHalf, new ImVec2(60,40)))
                    color.value.Copy(backup_color.value);
                ImGui.Separator();
                ImGui.Text("Palette");
                for (let n = 0; n < IM_ARRAYSIZE(saved_palette.value); n++)
                {
                    ImGui.PushID(n);
                    if ((n % 8) !== 0)
                        ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                    if (ImGui.ColorButton("##palette", saved_palette.value[n], ImGuiColorEditFlags.NoAlpha | ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.NoTooltip, new ImVec2(20,20)))
                        color.value.Copy(new ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!

                    if (ImGui.BeginDragDropTarget())
                    {
                        // if (const ImGuiPayload* payload = AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_3F))
                        //     memcpy((float*)&saved_palette[n], payload->Data, sizeof(float) * 3);
                        // if (const ImGuiPayload* payload = AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_4F))
                        //     memcpy((float*)&saved_palette[n], payload->Data, sizeof(float) * 4);
                        ImGui.EndDragDropTarget();
                    }

                    ImGui.PopID();
                }
                ImGui.EndGroup();
                ImGui.EndPopup();
            }

            ImGui.Text("Color button only:");
            ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new ImVec2(80,80));

            ImGui.Text("Color picker:");
            /* static */ const alpha: Static<boolean> = STATIC("alpha", true);
            /* static */ const alpha_bar: Static<boolean> = STATIC("alpha_bar", true);
            /* static */ const side_preview: Static<boolean> = STATIC("side_preview", true);
            /* static */ const ref_color: Static<boolean> = STATIC("ref_color", false);
            /* static */ const ref_color_v: Static<ImVec4> = STATIC("ref_color_v", new ImVec4(1.0,0.0,1.0,0.5));
            /* static */ const inputs_mode: Static<number> = STATIC("inputs_mode", 2);
            /* static */ const picker_mode: Static<number> = STATIC("picker_mode", 0);
            ImGui.Checkbox("With Alpha", (value = alpha.value) => alpha.value = value);
            ImGui.Checkbox("With Alpha Bar", (value = alpha_bar.value) => alpha_bar.value = value);
            ImGui.Checkbox("With Side Preview", (value = side_preview.value) => side_preview.value = value);
            if (side_preview)
            {
                ImGui.SameLine();
                ImGui.Checkbox("With Ref Color", (value = ref_color.value) => ref_color.value = value);
                if (ref_color.value)
                {
                    ImGui.SameLine();
                    ImGui.ColorEdit4("##RefColor", ref_color_v.value, ImGuiColorEditFlags.NoInputs | misc_flags);
                }
            }
            ImGui.Combo("Inputs Mode", (value = inputs_mode.value) => inputs_mode.value = value, "All Inputs\0No Inputs\0RGB Input\0HSV Input\0HEX Input\0");
            ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
            ImGui.SameLine(); ShowHelpMarker("User can right-click the picker to change mode.");
            let flags: ImGuiColorEditFlags = misc_flags;
            if (!alpha.value) flags |= ImGuiColorEditFlags.NoAlpha; // This is by default if you call ColorPicker3() instead of ColorPicker4()
            if (alpha_bar.value) flags |= ImGuiColorEditFlags.AlphaBar;
            if (!side_preview.value) flags |= ImGuiColorEditFlags.NoSidePreview;
            if (picker_mode.value === 1) flags |= ImGuiColorEditFlags.PickerHueBar;
            if (picker_mode.value === 2) flags |= ImGuiColorEditFlags.PickerHueWheel;
            if (inputs_mode.value === 1) flags |= ImGuiColorEditFlags.NoInputs;
            if (inputs_mode.value === 2) flags |= ImGuiColorEditFlags.RGB;
            if (inputs_mode.value === 3) flags |= ImGuiColorEditFlags.HSV;
            if (inputs_mode.value === 4) flags |= ImGuiColorEditFlags.HEX;
            ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);

            ImGui.Text("Programmatically set defaults/options:");
            ImGui.SameLine(); ShowHelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
            if (ImGui.Button("Uint8 + HSV"))
                ImGui.SetColorEditOptions(ImGuiColorEditFlags.Uint8 | ImGuiColorEditFlags.HSV);
            ImGui.SameLine();
            if (ImGui.Button("Float + HDR"))
                ImGui.SetColorEditOptions(ImGuiColorEditFlags.Float | ImGuiColorEditFlags.RGB);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Range Widgets"))
        {
            /* static */ const begin: Static<number> = STATIC("begin", 10), end: Static<number> = STATIC("end", 90);
            /* static */ const begin_i: Static<number> = STATIC("begin_i", 100), end_i: Static<number> = STATIC("end_i", 1000);
            ImGui.DragFloatRange2("range", (value = begin.value) => begin.value = value, (value = end.value) => end.value = value, 0.25, 0.0, 100.0, "Min: %.1f %%", "Max: %.1f %%");
            ImGui.DragIntRange2("range int (no bounds)", (value = begin_i.value) => begin_i.value = value, (value = end_i.value) => end_i.value = value, 5, 0, 0, "Min: %.0f units", "Max: %.0f units");
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Multi-component Widgets"))
        {
            /* static */ const vec4f: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4f", [ 0.10, 0.20, 0.30, 0.44 ]);
            /* static */ const vec4i: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4i", [ 1, 5, 100, 255 ]);

            ImGui.InputFloat2("input float2", vec4f.value);
            ImGui.DragFloat2("drag float2", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat2("slider float2", vec4f.value, 0.0, 1.0);
            ImGui.DragInt2("drag int2", vec4i.value, 1, 0, 255);
            ImGui.InputInt2("input int2", vec4i.value);
            ImGui.SliderInt2("slider int2", vec4i.value, 0, 255);
            ImGui.Spacing();

            ImGui.InputFloat3("input float3", vec4f.value);
            ImGui.DragFloat3("drag float3", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat3("slider float3", vec4f.value, 0.0, 1.0);
            ImGui.DragInt3("drag int3", vec4i.value, 1, 0, 255);
            ImGui.InputInt3("input int3", vec4i.value);
            ImGui.SliderInt3("slider int3", vec4i.value, 0, 255);
            ImGui.Spacing();

            ImGui.InputFloat4("input float4", vec4f.value);
            ImGui.DragFloat4("drag float4", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat4("slider float4", vec4f.value, 0.0, 1.0);
            ImGui.InputInt4("input int4", vec4i.value);
            ImGui.DragInt4("drag int4", vec4i.value, 1, 0, 255);
            ImGui.SliderInt4("slider int4", vec4i.value, 0, 255);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Vertical Sliders"))
        {
            const spacing: number = 4;
            ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(spacing, spacing));

            /* static */ const int_value: Static<number> = STATIC("int_value", 0);
            ImGui.VSliderInt("##int", new ImVec2(18,160), (value = int_value.value) => int_value.value = value, 0, 5);
            ImGui.SameLine();

            /* static */ const values: Static<number[]> = STATIC("values#1072", [ 0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0 ]);
            ImGui.PushID("set1");
            for (let i = 0; i < 7; i++)
            {
                if (i > 0) ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(ImGuiCol.FrameBg, ImColor.HSV(i/7.0, 0.5, 0.5));
                ImGui.PushStyleColor(ImGuiCol.FrameBgHovered, ImColor.HSV(i/7.0, 0.6, 0.5));
                ImGui.PushStyleColor(ImGuiCol.FrameBgActive, ImColor.HSV(i/7.0, 0.7, 0.5));
                ImGui.PushStyleColor(ImGuiCol.SliderGrab, ImColor.HSV(i/7.0, 0.9, 0.9));
                ImGui.VSliderFloat("##v", new ImVec2(18,160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
                if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                    ImGui.SetTooltip(`${values.value[i].toFixed(3)}`);
                ImGui.PopStyleColor(4);
                ImGui.PopID();
            }
            ImGui.PopID();

            ImGui.SameLine();
            ImGui.PushID("set2");
            /* static */ const values2: Static<number[/*4*/]> = STATIC("values2", [ 0.20, 0.80, 0.40, 0.25 ]);
            const rows: number = 3;
            const small_slider_size: Readonly<ImVec2> = new ImVec2(18, (160.0-(rows-1)*spacing)/rows);
            for (let nx = 0; nx < 4; nx++)
            {
                if (nx > 0) ImGui.SameLine();
                ImGui.BeginGroup();
                for (let ny = 0; ny < rows; ny++)
                {
                    ImGui.PushID(nx*rows+ny);
                    ImGui.VSliderFloat("##v", small_slider_size, (value = values2.value[nx]) => values2.value[nx] = value, 0.0, 1.0, "");
                    if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                        ImGui.SetTooltip(`${values2.value[nx].toFixed(3)}`);
                    ImGui.PopID();
                }
                ImGui.EndGroup();
            }
            ImGui.PopID();

            ImGui.SameLine();
            ImGui.PushID("set3");
            for (let i = 0; i < 4; i++)
            {
                if (i > 0) ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleVar(ImGuiStyleVar.GrabMinSize, 40);
                ImGui.VSliderFloat("##v", new ImVec2(40,160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
                ImGui.PopStyleVar();
                ImGui.PopID();
            }
            ImGui.PopID();
            ImGui.PopStyleVar();
            ImGui.TreePop();
        }
    }

    if (ImGui.CollapsingHeader("Layout"))
    {
        if (ImGui.TreeNode("Child regions"))
        {
            /* static */ const disable_mouse_wheel: Static<boolean> = STATIC("disable_mouse_wheel", false);
            ImGui.Checkbox("Disable Mouse Wheel", (value = disable_mouse_wheel.value) => disable_mouse_wheel.value = value);

            ImGui.Text("Without border");
            /* static */ const line: Static<number> = STATIC("line", 50);
            let goto_line: boolean = ImGui.Button("Goto");
            ImGui.SameLine();
            ImGui.PushItemWidth(100);
            goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, ImGuiInputTextFlags.EnterReturnsTrue) || goto_line;
            ImGui.PopItemWidth();

            ImGui.BeginChild("Sub1", new ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5,300), false, ImGuiWindowFlags.HorizontalScrollbar | (disable_mouse_wheel.value ? ImGuiWindowFlags.NoScrollWithMouse : 0));
            for (let i = 0; i < 100; i++)
            {
                ImGui.Text(`${("0000" + i.toString()).substr(-4)}: scrollable region`);
                if (goto_line && line.value === i)
                    ImGui.SetScrollHere();
            }
            if (goto_line && line.value >= 100)
                ImGui.SetScrollHere();
            ImGui.EndChild();

            ImGui.SameLine();

            ImGui.PushStyleVar(ImGuiStyleVar.ChildRounding, 5.0);
            ImGui.BeginChild("Sub2", new ImVec2(0,300), true, (disable_mouse_wheel.value ? ImGuiWindowFlags.NoScrollWithMouse : 0));
            ImGui.Text("With border");
            ImGui.Columns(2);
            for (let i = 0; i < 100; i++)
            {
                if (i === 50)
                    ImGui.NextColumn();
                const buf: string = `${("00000000" + (i*5731).toString(16)).substr(-8)}`;
                ImGui.Button(buf, new ImVec2(-1.0, 0.0));
            }
            ImGui.EndChild();
            ImGui.PopStyleVar();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Widgets Width"))
        {
            /* static */ const f: Static<number> = STATIC("f#1181", 0.0);
            ImGui.Text("PushItemWidth(100)");
            ImGui.SameLine(); ShowHelpMarker("Fixed width.");
            ImGui.PushItemWidth(100);
            ImGui.DragFloat("float##1", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();

            ImGui.Text("PushItemWidth(GetWindowWidth() * 0.5)");
            ImGui.SameLine(); ShowHelpMarker("Half of window width.");
            ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.5);
            ImGui.DragFloat("float##2", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();

            ImGui.Text("PushItemWidth(GetContentRegionAvailWidth() * 0.5)");
            ImGui.SameLine(); ShowHelpMarker("Half of available width.\n(~ right-cursor_pos)\n(works within a column set)");
            ImGui.PushItemWidth(ImGui.GetContentRegionAvailWidth() * 0.5);
            ImGui.DragFloat("float##3", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();

            ImGui.Text("PushItemWidth(-100)");
            ImGui.SameLine(); ShowHelpMarker("Align to right edge minus 100");
            ImGui.PushItemWidth(-100);
            ImGui.DragFloat("float##4", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();

            ImGui.Text("PushItemWidth(-1)");
            ImGui.SameLine(); ShowHelpMarker("Align to right edge");
            ImGui.PushItemWidth(-1);
            ImGui.DragFloat("float##5", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Basic Horizontal Layout"))
        {
            ImGui.TextWrapped("(Use ImGui.SameLine() to keep adding items to the right of the preceding item)");

            // Text
            ImGui.Text("Two items: Hello"); ImGui.SameLine();
            ImGui.TextColored(new ImVec4(1,1,0,1), "Sailor");

            // Adjust spacing
            ImGui.Text("More spacing: Hello"); ImGui.SameLine(0, 20);
            ImGui.TextColored(new ImVec4(1,1,0,1), "Sailor");

            // Button
            ImGui.AlignTextToFramePadding();
            ImGui.Text("Normal buttons"); ImGui.SameLine();
            ImGui.Button("Banana"); ImGui.SameLine();
            ImGui.Button("Apple"); ImGui.SameLine();
            ImGui.Button("Corniflower");

            // Button
            ImGui.Text("Small buttons"); ImGui.SameLine();
            ImGui.SmallButton("Like this one"); ImGui.SameLine();
            ImGui.Text("can fit within a text block.");

            // Aligned to arbitrary position. Easy/cheap column.
            ImGui.Text("Aligned");
            ImGui.SameLine(150); ImGui.Text("x=150");
            ImGui.SameLine(300); ImGui.Text("x=300");
            ImGui.Text("Aligned");
            ImGui.SameLine(150); ImGui.SmallButton("x=150");
            ImGui.SameLine(300); ImGui.SmallButton("x=300");

            // Checkbox
            /* static */ const c1: Static<boolean>=STATIC("c1", false),c2: Static<boolean>=STATIC("c2", false),c3: Static<boolean>=STATIC("c3", false),c4: Static<boolean>=STATIC("c4", false);
            ImGui.Checkbox("My", (value = c1.value) => c1.value = value); ImGui.SameLine();
            ImGui.Checkbox("Tailor", (value = c2.value) => c2.value = value); ImGui.SameLine();
            ImGui.Checkbox("Is", (value = c3.value) => c3.value = value); ImGui.SameLine();
            ImGui.Checkbox("Rich", (value = c4.value) => c4.value = value);

            // Various
            /* static */ const f0: Static<number>=STATIC("f0#1255", 1.0), f1: Static<number>=STATIC("f1#1255", 2.0), f2: Static<number>=STATIC("f2", 3.0);
            ImGui.PushItemWidth(80);
            const items: string[] = [ "AAAA", "BBBB", "CCCC", "DDDD" ];
            /* static */ const item: Static<number> = STATIC("item#1258", -1);
            ImGui.Combo("Combo", (value = item.value) => item.value = value, items, IM_ARRAYSIZE(items)); ImGui.SameLine();
            ImGui.SliderFloat("X", (value = f0.value) => f0.value = value, 0.0,5.0); ImGui.SameLine();
            ImGui.SliderFloat("Y", (value = f1.value) => f1.value = value, 0.0,5.0); ImGui.SameLine();
            ImGui.SliderFloat("Z", (value = f2.value) => f2.value = value, 0.0,5.0);
            ImGui.PopItemWidth();

            ImGui.PushItemWidth(80);
            ImGui.Text("Lists:");
            /* static */ const selection: Static<number[/*4*/]> = STATIC("selection", [ 0, 1, 2, 3 ]);
            for (let i = 0; i < 4; i++)
            {
                if (i > 0) ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.ListBox("", (value = selection.value[i]) => selection.value[i] = value, items, IM_ARRAYSIZE(items));
                ImGui.PopID();
                if (ImGui.IsItemHovered()) ImGui.SetTooltip(`ListBox ${i} hovered`);
            }
            ImGui.PopItemWidth();

            // Dummy
            const sz: Readonly<ImVec2> = new ImVec2(30,30);
            ImGui.Button("A", sz); ImGui.SameLine();
            ImGui.Dummy(sz); ImGui.SameLine();
            ImGui.Button("B", sz);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Groups"))
        {
            ImGui.TextWrapped("(Using ImGui.BeginGroup()/EndGroup() to layout items. BeginGroup() basically locks the horizontal position. EndGroup() bundles the whole group so that you can use functions such as IsItemHovered() on it.)");
            ImGui.BeginGroup();
            {
                ImGui.BeginGroup();
                ImGui.Button("AAA");
                ImGui.SameLine();
                ImGui.Button("BBB");
                ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Button("CCC");
                ImGui.Button("DDD");
                ImGui.EndGroup();
                ImGui.SameLine();
                ImGui.Button("EEE");
                ImGui.EndGroup();
                if (ImGui.IsItemHovered())
                    ImGui.SetTooltip("First group hovered");
            }
            // Capture the group size and create widgets using the same size
            const size: ImVec2 = ImGui.GetItemRectSize();
            const values: number[/*5*/] = [ 0.5, 0.20, 0.80, 0.60, 0.25 ];
            ImGui.PlotHistogram_Array("##values", values, IM_ARRAYSIZE(values), 0, null, 0.0, 1.0, size);

            ImGui.Button("ACTION", new ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x)*0.5,size.y));
            ImGui.SameLine();
            ImGui.Button("REACTION", new ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x)*0.5,size.y));
            ImGui.EndGroup();
            ImGui.SameLine();

            ImGui.Button("LEVERAGE\nBUZZWORD", size);
            ImGui.SameLine();

            ImGui.ListBoxHeader("List", size);
            ImGui.Selectable("Selected", true);
            ImGui.Selectable("Not Selected", false);
            ImGui.ListBoxFooter();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Text Baseline Alignment"))
        {
            ImGui.TextWrapped("(This is testing the vertical alignment that occurs on text to keep it at the same baseline as widgets. Lines only composed of text or \"small\" widgets fit in less vertical spaces than lines with normal widgets)");

            ImGui.Text("One\nTwo\nThree"); ImGui.SameLine();
            ImGui.Text("Hello\nWorld"); ImGui.SameLine();
            ImGui.Text("Banana");

            ImGui.Text("Banana"); ImGui.SameLine();
            ImGui.Text("Hello\nWorld"); ImGui.SameLine();
            ImGui.Text("One\nTwo\nThree");

            ImGui.Button("HOP##1"); ImGui.SameLine();
            ImGui.Text("Banana"); ImGui.SameLine();
            ImGui.Text("Hello\nWorld"); ImGui.SameLine();
            ImGui.Text("Banana");

            ImGui.Button("HOP##2"); ImGui.SameLine();
            ImGui.Text("Hello\nWorld"); ImGui.SameLine();
            ImGui.Text("Banana");

            ImGui.Button("TEST##1"); ImGui.SameLine();
            ImGui.Text("TEST"); ImGui.SameLine();
            ImGui.SmallButton("TEST##2");

            ImGui.AlignTextToFramePadding(); // If your line starts with text, call this to align it to upcoming widgets.
            ImGui.Text("Text aligned to Widget"); ImGui.SameLine();
            ImGui.Button("Widget##1"); ImGui.SameLine();
            ImGui.Text("Widget"); ImGui.SameLine();
            ImGui.SmallButton("Widget##2"); ImGui.SameLine();
            ImGui.Button("Widget##3");

            // Tree
            const spacing: number = ImGui.GetStyle().ItemInnerSpacing.x;
            ImGui.Button("Button##1");
            ImGui.SameLine(0.0, spacing);
            if (ImGui.TreeNode("Node##1")) { for (let i = 0; i < 6; i++) ImGui.BulletText(`Item ${i}..`); ImGui.TreePop(); }    // Dummy tree data

            ImGui.AlignTextToFramePadding();         // Vertically align text node a bit lower so it'll be vertically centered with upcoming widget. Otherwise you can use SmallButton (smaller fit).
            const node_open: boolean = ImGui.TreeNode("Node##2");  // Common mistake to avoid: if we want to SameLine after TreeNode we need to do it before we add child content.
            ImGui.SameLine(0.0, spacing); ImGui.Button("Button##2");
            if (node_open) { for (let i = 0; i < 6; i++) ImGui.BulletText(`Item ${i}..`); ImGui.TreePop(); }   // Dummy tree data

            // Bullet
            ImGui.Button("Button##3");
            ImGui.SameLine(0.0, spacing);
            ImGui.BulletText("Bullet text");

            ImGui.AlignTextToFramePadding();
            ImGui.BulletText("Node");
            ImGui.SameLine(0.0, spacing); ImGui.Button("Button##4");

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Scrolling"))
        {
            ImGui.TextWrapped("(Use SetScrollHere() or SetScrollFromPosY() to scroll to a given position.)");
            /* static */ const track: Static<boolean> = STATIC("track", true);
            /* static */ const track_line: Static<number> = STATIC("track_line", 50), scroll_to_px: Static<number> = STATIC("scroll_to_px", 200);
            ImGui.Checkbox("Track", (value = track.value) => track.value = value);
            ImGui.PushItemWidth(100);
            ImGui.SameLine(130); track.value = ImGui.DragInt("##line", (value = track_line.value) => track_line.value = value, 0.25, 0, 99, "Line = %.0f") || track.value;
            let scroll_to: boolean = ImGui.Button("Scroll To Pos");
            ImGui.SameLine(130); scroll_to = ImGui.DragInt("##pos_y", (value = scroll_to_px.value) => scroll_to_px.value = value, 1.00, 0, 9999, "Y = %.0f px") || scroll_to;
            ImGui.PopItemWidth();
            if (scroll_to) track.value = false;

            for (let i = 0; i < 5; i++)
            {
                if (i > 0) ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text(i === 0 ? "Top" : i === 1 ? "25%" : i === 2 ? "Center" : i === 3 ? "75%" : "Bottom");
                ImGui.BeginChild(ImGui.GetID(i), new ImVec2(ImGui.GetWindowWidth() * 0.17, 200.0), true);
                if (scroll_to)
                    ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_px.value, i * 0.25);
                for (let line = 0; line < 100; line++)
                {
                    if (track.value && line === track_line.value)
                    {
                        ImGui.TextColored(new ImColor(255,255,0), `Line ${line}`);
                        ImGui.SetScrollHere(i * 0.25); // 0.0:top, 0.5f:center, 1.0f:bottom
                    }
                    else
                    {
                        ImGui.Text(`Line ${line}`);
                    }
                }
                const scroll_y: number = ImGui.GetScrollY(), scroll_max_y: number = ImGui.GetScrollMaxY();
                ImGui.EndChild();
                ImGui.Text(`${scroll_y.toFixed(0)}/${scroll_max_y.toFixed(0)}`);
                ImGui.EndGroup();
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Horizontal Scrolling"))
        {
            ImGui.Bullet(); ImGui.TextWrapped("Horizontal scrolling for a window has to be enabled explicitly via the ImGuiWindowFlags.HorizontalScrollbar flag.");
            ImGui.Bullet(); ImGui.TextWrapped("You may want to explicitly specify content width by calling SetNextWindowContentWidth() before Begin().");
            /* static */ const lines: Static<number> = STATIC("lines#1432", 7);
            ImGui.SliderInt("Lines", (value = lines.value) => lines.value = value, 1, 15);
            ImGui.PushStyleVar(ImGuiStyleVar.FrameRounding, 3.0);
            ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(2.0, 1.0));
            ImGui.BeginChild("scrolling", new ImVec2(0, ImGui.GetFrameHeightWithSpacing()*7 + 30), true, ImGuiWindowFlags.HorizontalScrollbar);
            for (let line = 0; line < lines.value; line++)
            {
                // Display random stuff (for the sake of this trivial demo we are using basic Button+SameLine. If you want to create your own time line for a real application you may be better off 
                // manipulating the cursor position yourself, aka using SetCursorPos/SetCursorScreenPos to position the widgets yourself. You may also want to use the lower-level ImDrawList API)
                const num_buttons: number = 10 + ((line & 1) ? line * 9 : line * 3);
                for (let n = 0; n < num_buttons; n++)
                {
                    if (n > 0) ImGui.SameLine();
                    ImGui.PushID(n + line * 1000);
                    const num_buf: string = n.toFixed(0);
                    const label: string = (!(n%15)) ? "FizzBuzz" : (!(n%3)) ? "Fizz" : (!(n%5)) ? "Buzz" : num_buf;
                    const hue: number = n*0.05;
                    ImGui.PushStyleColor(ImGuiCol.Button, ImColor.HSV(hue, 0.6, 0.6));
                    ImGui.PushStyleColor(ImGuiCol.ButtonHovered, ImColor.HSV(hue, 0.7, 0.7));
                    ImGui.PushStyleColor(ImGuiCol.ButtonActive, ImColor.HSV(hue, 0.8, 0.8));
                    ImGui.Button(label, new ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
                    ImGui.PopStyleColor(3);
                    ImGui.PopID();
                }
            }
            const scroll_x: number = ImGui.GetScrollX(), scroll_max_x: number = ImGui.GetScrollMaxX();
            ImGui.EndChild();
            ImGui.PopStyleVar(2);
            let scroll_x_delta: number = 0.0;
            ImGui.SmallButton("<<"); if (ImGui.IsItemActive()) scroll_x_delta = -ImGui.GetIO().DeltaTime * 1000.0; ImGui.SameLine(); 
            ImGui.Text("Scroll from code"); ImGui.SameLine();
            ImGui.SmallButton(">>"); if (ImGui.IsItemActive()) scroll_x_delta = +ImGui.GetIO().DeltaTime * 1000.0; ImGui.SameLine(); 
            ImGui.Text(`${scroll_x.toFixed(0)}/${scroll_max_x.toFixed(0)}`);
            if (scroll_x_delta !== 0.0)
            {
                ImGui.BeginChild("scrolling"); // Demonstrate a trick: you can use Begin to set yourself in the context of another window (here we are already out of your child window)
                ImGui.SetScrollX(ImGui.GetScrollX() + scroll_x_delta);
                ImGui.End();
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Clipping"))
        {
            /* static */ const size: Static<ImVec2> = STATIC("size", new ImVec2(100, 100)), offset: Static<ImVec2> = STATIC("offset", new ImVec2(50, 20));
            ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
            ImGui.DragFloat2("size", size.value, 0.5, 0.0, 200.0, "%.0f");
            ImGui.TextWrapped("(Click and drag)");
            const pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
            const clip_rect: Readonly<ImVec4> = new ImVec4(pos.x, pos.y, pos.x+size.value.x, pos.y+size.value.y);
            ImGui.InvisibleButton("##dummy", size.value);
            if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) { offset.value.x += ImGui.GetIO().MouseDelta.x; offset.value.y += ImGui.GetIO().MouseDelta.y; }
            ImGui.GetWindowDrawList().AddRectFilled(pos, new ImVec2(pos.x+size.value.x,pos.y+size.value.y), IM_COL32(90,90,120,255));
            ImGui.GetWindowDrawList().AddText_Font(ImGui.GetFont(), ImGui.GetFontSize()*2.0, new ImVec2(pos.x+offset.value.x,pos.y+offset.value.y), IM_COL32(255,255,255,255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
            ImGui.TreePop();
        }
    }

    if (ImGui.CollapsingHeader("Popups & Modal windows"))
    {
        if (ImGui.TreeNode("Popups"))
        {
            ImGui.TextWrapped("When a popup is active, it inhibits interacting with windows that are behind the popup. Clicking outside the popup closes it.");

            /* static */ const selected_fish: Static<number> = STATIC("selected_fish", -1);
            const names: string[] = [ "Bream", "Haddock", "Mackerel", "Pollock", "Tilefish" ];
            /* static */ const toggles: Static<boolean[]> = STATIC("toggles", [ true, false, false, false, false ]);

            // Simple selection popup
            // (If you want to show the current selection inside the Button itself, you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
            if (ImGui.Button("Select.."))
                ImGui.OpenPopup("select");
            ImGui.SameLine();
            ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value]);
            if (ImGui.BeginPopup("select"))
            {
                ImGui.Text("Aquarium");
                ImGui.Separator();
                for (let i = 0; i < IM_ARRAYSIZE(names); i++)
                    if (ImGui.Selectable(names[i]))
                        selected_fish.value = i;
                ImGui.EndPopup();
            }

            // Showing a menu with toggles
            if (ImGui.Button("Toggle.."))
                ImGui.OpenPopup("toggle");
            if (ImGui.BeginPopup("toggle"))
            {
                for (let i = 0; i < IM_ARRAYSIZE(names); i++)
                {
                    ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
                }
                if (ImGui.BeginMenu("Sub-menu"))
                {
                    ImGui.MenuItem("Click me");
                    ImGui.EndMenu();
                }

                ImGui.Separator();
                ImGui.Text("Tooltip here");
                if (ImGui.IsItemHovered())
                    ImGui.SetTooltip("I am a tooltip over a popup");

                if (ImGui.Button("Stacked Popup"))
                    ImGui.OpenPopup("another popup");
                if (ImGui.BeginPopup("another popup"))
                {
                    for (let i = 0; i < IM_ARRAYSIZE(names); i++)
                    {
                        ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
                    }
                    if (ImGui.BeginMenu("Sub-menu"))
                    {
                        ImGui.MenuItem("Click me");
                        ImGui.EndMenu();
                    }
                    ImGui.EndPopup();
                }
                ImGui.EndPopup();
            }

            if (ImGui.Button("Popup Menu.."))
                ImGui.OpenPopup("FilePopup");
            if (ImGui.BeginPopup("FilePopup"))
            {
                ShowExampleMenuFile();
                ImGui.EndPopup();
            }

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Context menus"))
        {
            // BeginPopupContextItem() is a helper to provide common/simple popup behavior of essentially doing:
            //    if (IsItemHovered() && IsMouseClicked(0))
            //       OpenPopup(id);
            //    return BeginPopup(id);
            // For more advanced uses you may want to replicate and cuztomize this code. This the comments inside BeginPopupContextItem() implementation.
            /* static */ const value: Static<number> = STATIC("value", 0.5);
            ImGui.Text(`Value = ${value.value.toFixed(3)} (<-- right-click here)`);
            if (ImGui.BeginPopupContextItem("item context menu"))
            {
                if (ImGui.Selectable("Set to zero")) value.value = 0.0;
                if (ImGui.Selectable("Set to PI")) value.value = 3.1415;
                ImGui.PushItemWidth(-1);
                ImGui.DragFloat("##Value", (_value = value.value) => value.value = _value, 0.1, 0.0, 0.0);
                ImGui.PopItemWidth();
                ImGui.EndPopup();
            }

            /* static */ const name: Static<ImStringBuffer> = STATIC("name", new ImStringBuffer(32, "Label1"));
            const buf: string = `Button: ${name}###Button`; // ### operator override ID ignoring the preceding label
            ImGui.Button(buf);
            if (ImGui.BeginPopupContextItem()) // When used after an item that has an ID (here the Button), we can skip providing an ID to BeginPopupContextItem().
            {
                ImGui.Text("Edit name:");
                ImGui.InputText("##edit", name.value, IM_ARRAYSIZE(name.value));
                if (ImGui.Button("Close"))
                    ImGui.CloseCurrentPopup();
                ImGui.EndPopup();
            }
            ImGui.SameLine(); ImGui.Text("(<-- right-click here)");

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Modals"))
        {
            ImGui.TextWrapped("Modal windows are like popups but the user cannot close them by clicking outside the window.");

            if (ImGui.Button("Delete.."))
                ImGui.OpenPopup("Delete?");
            if (ImGui.BeginPopupModal("Delete?", null, ImGuiWindowFlags.AlwaysAutoResize))
            {
                ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
                ImGui.Separator();

                ///* static */ const dummy_i: number = 0;
                //ImGui.Combo("Combo", &dummy_i, "Delete\0Delete harder\0");

                /* static */ const dont_ask_me_next_time: Static<boolean> = STATIC("dont_ask_me_next_time", false);
                ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0,0));
                ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
                ImGui.PopStyleVar();

                if (ImGui.Button("OK", new ImVec2(120,0))) { ImGui.CloseCurrentPopup(); }
                ImGui.SameLine();
                if (ImGui.Button("Cancel", new ImVec2(120,0))) { ImGui.CloseCurrentPopup(); }
                ImGui.EndPopup();
            }

            if (ImGui.Button("Stacked modals.."))
                ImGui.OpenPopup("Stacked 1");
            if (ImGui.BeginPopupModal("Stacked 1"))
            {
                ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGuiCol.ModalWindowDarkening] for darkening.");
                /* static */ const item: Static<number> = STATIC("item#1636", 1);
                ImGui.Combo("Combo", (value = item.value) => item.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                /* static */ const color: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("color#2", [ 0.4,0.7,0.0,0.5 ]);
                ImGui.ColorEdit4("color", color.value);  // This is to test behavior of stacked regular popups over a modal

                if (ImGui.Button("Add another modal.."))
                    ImGui.OpenPopup("Stacked 2");
                if (ImGui.BeginPopupModal("Stacked 2"))
                {
                    ImGui.Text("Hello from Stacked The Second");
                    if (ImGui.Button("Close"))
                        ImGui.CloseCurrentPopup();
                    ImGui.EndPopup();
                }

                if (ImGui.Button("Close"))
                    ImGui.CloseCurrentPopup();
                ImGui.EndPopup();
            }

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Menus inside a regular window"))
        {
            ImGui.TextWrapped("Below we are testing adding menu items to a regular window. It's rather unusual but should work!");
            ImGui.Separator();
            // NB: As a quirk in this very specific example, we want to differentiate the parent of this menu from the parent of the various popup menus above.
            // To do so we are encloding the items in a PushID()/PopID() block to make them two different menusets. If we don't, opening any popup above and hovering our menu here
            // would open it. This is because once a menu is active, we allow to switch to a sibling menu by just hovering on it, which is the desired behavior for regular menus.
            ImGui.PushID("foo");
            ImGui.MenuItem("Menu item", "CTRL+M");
            if (ImGui.BeginMenu("Menu inside a regular window"))
            {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            ImGui.PopID();
            ImGui.Separator();
            ImGui.TreePop();
        }
    }

    if (ImGui.CollapsingHeader("Columns"))
    {
        ImGui.PushID("Columns");

        // Basic columns
        if (ImGui.TreeNode("Basic"))
        {
            ImGui.Text("Without border:");
            ImGui.Columns(3, "mycolumns3", false);  // 3-ways, no border
            ImGui.Separator();
            for (let n = 0; n < 14; n++)
            {
                const label: string = `Item ${n}`;
                if (ImGui.Selectable(label)) {}
                if (ImGui.Button(label, new ImVec2(-1,0))) {}
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.Separator();

            ImGui.Text("With border:");
            ImGui.Columns(4, "mycolumns"); // 4-ways, with border
            ImGui.Separator();
            ImGui.Text("ID"); ImGui.NextColumn();
            ImGui.Text("Name"); ImGui.NextColumn();
            ImGui.Text("Path"); ImGui.NextColumn();
            ImGui.Text("Hovered"); ImGui.NextColumn();
            ImGui.Separator();
            const names: string[/*3*/] = [ "One", "Two", "Three" ];
            const paths: string[/*3*/] = [ "/path/one", "/path/two", "/path/three" ];
            /* static */ const selected: Static<number> = STATIC("selected#1709", -1);
            for (let i = 0; i < 3; i++)
            {
                const label: string = ("0000" + i.toString()).substr(-4);
                if (ImGui.Selectable(label, selected.value === i, ImGuiSelectableFlags.SpanAllColumns))
                    selected.value = i;
                const hovered: boolean = ImGui.IsItemHovered();
                ImGui.NextColumn();
                ImGui.Text(names[i]); ImGui.NextColumn();
                ImGui.Text(paths[i]); ImGui.NextColumn();
                ImGui.Text(`${hovered}`); ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }

        // Create multiple items in a same cell before switching to next column
        if (ImGui.TreeNode("Mixed items"))
        {
            ImGui.Columns(3, "mixed");
            ImGui.Separator();

            ImGui.Text("Hello");
            ImGui.Button("Banana");
            ImGui.NextColumn();

            ImGui.Text("ImGui");
            ImGui.Button("Apple");
            /* static */ const foo: Static<number> = STATIC("foo", 1.0);
            ImGui.InputFloat("red", (value = foo.value) => foo.value = value, 0.05, 0, 3);
            ImGui.Text("An extra line here.");
            ImGui.NextColumn();

            ImGui.Text("Sailor");
            ImGui.Button("Corniflower");
            /* static */ const bar: Static<number> = STATIC("bar", 1.0);
            ImGui.InputFloat("blue", (value = bar.value) => bar.value = value, 0.05, 0, 3);
            ImGui.NextColumn();

            if (ImGui.CollapsingHeader("Category A")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
            if (ImGui.CollapsingHeader("Category B")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
            if (ImGui.CollapsingHeader("Category C")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }

        // Word wrapping
        if (ImGui.TreeNode("Word-wrapping"))
        {
            ImGui.Columns(2, "word-wrapping");
            ImGui.Separator();
            ImGui.TextWrapped("The quick brown fox jumps over the lazy dog.");
            ImGui.TextWrapped("Hello Left");
            ImGui.NextColumn();
            ImGui.TextWrapped("The quick brown fox jumps over the lazy dog.");
            ImGui.TextWrapped("Hello Right");
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Borders"))
        {
            // NB: Future columns API should allow automatic horizontal borders.
            /* static */ const h_borders: Static<boolean> = STATIC("h_borders", true);
            /* static */ const v_borders: Static<boolean> = STATIC("v_borders", true);
            ImGui.Checkbox("horizontal", (value = h_borders.value) => h_borders.value = value);
            ImGui.SameLine();
            ImGui.Checkbox("vertical", (value = v_borders.value) => v_borders.value = value);
            ImGui.Columns(4, null, v_borders.value);
            for (let i = 0; i < 4*3; i++)
            {
                if (h_borders.value && ImGui.GetColumnIndex() === 0)
                    ImGui.Separator();
                // ImGui.Text("%c%c%c", 'a'+i, 'a'+i, 'a'+i);
                const c: string = String.fromCharCode("a".charCodeAt(0) + i);
                ImGui.Text(`${c}${c}${c}`);
                ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}\nOffset ${ImGui.GetColumnOffset().toFixed(2)}`);
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            if (h_borders.value)
                ImGui.Separator();
            ImGui.TreePop();
        }

        // Scrolling columns
        /*
        if (ImGui.TreeNode("Vertical Scrolling"))
        {
            ImGui.BeginChild("##header", ImVec2(0, ImGui.GetTextLineHeightWithSpacing()+ImGui.GetStyle().ItemSpacing.y));
            ImGui.Columns(3);
            ImGui.Text("ID"); ImGui.NextColumn();
            ImGui.Text("Name"); ImGui.NextColumn();
            ImGui.Text("Path"); ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.EndChild();
            ImGui.BeginChild("##scrollingregion", ImVec2(0, 60));
            ImGui.Columns(3);
            for (let i = 0; i < 10; i++)
            {
                ImGui.Text("%04d", i); ImGui.NextColumn();
                ImGui.Text("Foobar"); ImGui.NextColumn();
                ImGui.Text("/path/foobar/%04d/", i); ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.EndChild();
            ImGui.TreePop();
        }
        */

        if (ImGui.TreeNode("Horizontal Scrolling"))
        {
            ImGui.SetNextWindowContentSize(new ImVec2(1500.0, 0.0));
            ImGui.BeginChild("##ScrollingRegion", new ImVec2(0, ImGui.GetFontSize() * 20), false, ImGuiWindowFlags.HorizontalScrollbar);
            ImGui.Columns(10);
            const ITEMS_COUNT: number = 2000;
            const clipper: ImGuiListClipper = new ImGuiListClipper(ITEMS_COUNT);  // Also demonstrate using the clipper for large list
            while (clipper.Step())
            {
                for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    for (let j = 0; j < 10; j++)
                    {
                        ImGui.Text(`Line ${i} Column ${j}...`);
                        ImGui.NextColumn();
                    }
            }
            // clipper.delete(); // NOTE: native emscripten class
            ImGui.Columns(1);
            ImGui.EndChild();
            ImGui.TreePop();
        }

        const node_open: boolean = ImGui.TreeNode("Tree within single cell");
        ImGui.SameLine(); ShowHelpMarker("NB: Tree node must be poped before ending the cell. There's no storage of state per-cell.");
        if (node_open)
        {
            ImGui.Columns(2, "tree items");
            ImGui.Separator();
            if (ImGui.TreeNode("Hello")) { ImGui.BulletText("Sailor"); ImGui.TreePop(); } ImGui.NextColumn();
            if (ImGui.TreeNode("Bonjour")) { ImGui.BulletText("Marin"); ImGui.TreePop(); } ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }
        ImGui.PopID();
    }

    if (ImGui.CollapsingHeader("Filtering"))
    {
        /* static */ const filter: Static<ImGuiTextFilter> = STATIC("filter#1864", new ImGuiTextFilter);
        ImGui.Text("Filter usage:\n"
                    + "  \"\"         display all lines\n"
                    + "  \"xxx\"      display lines containing \"xxx\"\n"
                    + "  \"xxx,yyy\"  display lines containing \"xxx\" or \"yyy\"\n"
                    + "  \"-xxx\"     hide lines containing \"xxx\"");
        filter.value.Draw();
        const lines: string[] = [ "aaa1.c", "bbb1.c", "ccc1.c", "aaa2.cpp", "bbb2.cpp", "ccc2.cpp", "abc.h", "hello, world" ];
        for (let i = 0; i < IM_ARRAYSIZE(lines); i++)
            if (filter.value.PassFilter(lines[i]))
                ImGui.BulletText(lines[i]);
    }

    if (ImGui.CollapsingHeader("Inputs & Focus"))
    {
        const io: ImGuiIO = ImGui.GetIO();
        ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
        ImGui.SameLine(); ShowHelpMarker("Request ImGui to render a mouse cursor for you in software. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");

        ImGui.Text(`WantCaptureMouse: ${io.WantCaptureMouse}`);
        ImGui.Text(`WantCaptureKeyboard: ${io.WantCaptureKeyboard}`);
        ImGui.Text(`WantTextInput: ${io.WantTextInput}`);
        ImGui.Text(`WantMoveMouse: ${io.WantMoveMouse}`);

        if (ImGui.TreeNode("Keyboard & Mouse State"))
        {
            if (ImGui.IsMousePosValid())
                ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.x})`);
            else
                ImGui.Text("Mouse pos: <INVALID>");
            ImGui.Text("Mouse down:");     for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (io.MouseDownDuration[i] >= 0.0)   { ImGui.SameLine(); ImGui.Text(`b${i} (${io.MouseDownDuration[i].toFixed(2)} secs)`); }
            ImGui.Text("Mouse clicked:");  for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseClicked(i))          { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text("Mouse dbl-clicked:"); for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseDoubleClicked(i)) { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text("Mouse released:"); for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseReleased(i))         { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text(`Mouse wheel: ${io.MouseWheel.toFixed(1)}`);

            ImGui.Text("Keys down:");      for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (io.KeysDownDuration[i] >= 0.0)     { ImGui.SameLine(); ImGui.Text(`${i} (${io.KeysDownDuration[i].toFixed(2)} secs)`); }
            ImGui.Text("Keys pressed:");   for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (ImGui.IsKeyPressed(i))             { ImGui.SameLine(); ImGui.Text(i.toString()); }
            ImGui.Text("Keys release:");   for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (ImGui.IsKeyReleased(i))            { ImGui.SameLine(); ImGui.Text(i.toString()); }
            ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);

            ImGui.Button("Hovering me sets the\nkeyboard capture flag");
            if (ImGui.IsItemHovered())
                ImGui.CaptureKeyboardFromApp(true);
            ImGui.SameLine();
            ImGui.Button("Holding me clears the\nthe keyboard capture flag");
            if (ImGui.IsItemActive())
                ImGui.CaptureKeyboardFromApp(false);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Tabbing"))
        {
            ImGui.Text("Use TAB/SHIFT+TAB to cycle through keyboard editable fields.");
            /* static */ const buf: Static<ImStringBuffer> = STATIC("buf1#1921", new ImStringBuffer(32, "dummy"));
            ImGui.InputText("1", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.InputText("2", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.InputText("3", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.PushAllowKeyboardFocus(false);
            ImGui.InputText("4 (tab skip)", buf.value, IM_ARRAYSIZE(buf.value));
            //ImGui.SameLine(); ShowHelperMarker("Use ImGui.PushAllowKeyboardFocus(bool)\nto disable tabbing through certain widgets.");
            ImGui.PopAllowKeyboardFocus();
            ImGui.InputText("5", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Focus from code"))
        {
            const focus_1: boolean = ImGui.Button("Focus on 1"); ImGui.SameLine();
            const focus_2: boolean = ImGui.Button("Focus on 2"); ImGui.SameLine();
            const focus_3: boolean = ImGui.Button("Focus on 3");
            let has_focus: number = 0;
            /* static */ const buf: Static<ImStringBuffer> = STATIC("buf2#1944", new ImStringBuffer(128, "click on a button to set focus"));

            if (focus_1) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("1", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 1;

            if (focus_2) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("2", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 2;

            ImGui.PushAllowKeyboardFocus(false);
            if (focus_3) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("3 (tab skip)", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 3;
            ImGui.PopAllowKeyboardFocus();
            if (has_focus)
                ImGui.Text(`Item with focus: ${has_focus}`);
            else
                ImGui.Text("Item with focus: <none>");
            ImGui.TextWrapped("Cursor & selection are preserved when refocusing last used item in code.");
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Focused & Hovered Test"))
        {
            /* static */ const embed_all_inside_a_child_window: Static<boolean> = STATIC("embed_all_inside_a_child_window", false);
            ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
            if (embed_all_inside_a_child_window.value)
                ImGui.BeginChild("embeddingchild", new ImVec2(0, ImGui.GetFontSize() * 25), true);

            // Testing IsWindowFocused() function with its various flags (note that the flags can be combined)
            ImGui.BulletText(
                `IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
                `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.ChildWindows)}\n` +
                `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.ChildWindows | ImGuiFocusedFlags.RootWindow)}\n` +
                `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.RootWindow)}\n`);

            // Testing IsWindowHovered() function with its various flags (note that the flags can be combined)
            ImGui.BulletText(
                `IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
                `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.ChildWindows)}\n` +
                `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.ChildWindows | ImGuiHoveredFlags.RootWindow)}\n` +
                `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.RootWindow)}\n"`);

            // Testing IsItemHovered() function (because BulletText is an item itself and that would affect the output of IsItemHovered, we pass all lines in a single items to shorten the code)
            ImGui.Button("ITEM");
            ImGui.BulletText(
                `IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenOverlapped)}\n` +
                `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.RectOnly)}\n`);

            ImGui.BeginChild("child", new ImVec2(0,50), true);
            ImGui.Text("This is another child window for testing IsWindowHovered() flags.");
            ImGui.EndChild();

            if (embed_all_inside_a_child_window.value)
                ImGui.EndChild();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Dragging"))
        {
            ImGui.TextWrapped("You can use ImGui.GetMouseDragDelta(0) to query for the dragged amount on any widget.");
            for (let button = 0; button < 3; button++)
                ImGui.Text(`IsMouseDragging(${button}):\n  w/ default threshold: ${ImGui.IsMouseDragging(button)},\n  w/ zero threshold: ${ImGui.IsMouseDragging(button, 0.0)}\n  w/ large threshold: ${ImGui.IsMouseDragging(button, 20.0)}`);
            ImGui.Button("Drag Me");
            if (ImGui.IsItemActive())
            {
                // Draw a line between the button and the mouse cursor
                const draw_list: ImGui.ImDrawList = ImGui.GetWindowDrawList();
                draw_list.PushClipRectFullScreen();
                draw_list.AddLine(ImGui.CalcItemRectClosestPoint(io.MousePos, true, -2.0), io.MousePos, ImGui.ColorConvertFloat4ToU32(ImGui.GetStyle().Colors[ImGuiCol.Button]), 4.0);
                draw_list.PopClipRect();

                // Drag operations gets "unlocked" when the mouse has moved past a certain threshold (the default threshold is stored in io.MouseDragThreshold)
                // You can request a lower or higher threshold using the second parameter of IsMouseDragging() and GetMouseDragDelta()
                const value_raw: Readonly<ImVec2> = ImGui.GetMouseDragDelta(0, 0.0);
                const value_with_lock_threshold: Readonly<ImVec2> = ImGui.GetMouseDragDelta(0);
                const mouse_delta: Readonly<ImGui.reference_ImVec2> = io.MouseDelta;
                ImGui.SameLine(); ImGui.Text(`Raw (${value_raw.x.toFixed(1)}, ${value_raw.y.toFixed(1)}), WithLockThresold (${value_with_lock_threshold.x.toFixed(1)}, ${value_with_lock_threshold.y.toFixed(1)}), MouseDelta (${mouse_delta.x.toFixed(1)}, ${mouse_delta.y.toFixed(1)})`);
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Mouse cursors"))
        {
            const mouse_cursors_names: string[] = [ "Arrow", "TextInput", "Move", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE" ];
            IM_ASSERT(IM_ARRAYSIZE(mouse_cursors_names) === ImGuiMouseCursor.COUNT);

            ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
            ImGui.Text("Hover to see mouse cursors:");
            ImGui.SameLine(); ShowHelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
            for (let i = 0; i < ImGuiMouseCursor.COUNT; i++)
            {
                const label: string = `Mouse cursor ${i}: ${mouse_cursors_names[i]}`;
                ImGui.Bullet(); ImGui.Selectable(label, false);
                if (ImGui.IsItemHovered())
                    ImGui.SetMouseCursor(i);
            }
            ImGui.TreePop();
        }
    }

    ImGui.End();
}

// Demo helper function to select among default colors. See ShowStyleEditor() for more advanced options.
// Here we use the simplified Combo() api that packs items into a single literal string. Useful for quick combo boxes where the choices are known locally.
export function ShowStyleSelector(label: string): boolean
{
    /* static */ const style_idx: Static<number> = STATIC("style_idx", 0);
    if (ImGui.Combo(label, (value = style_idx.value) => style_idx.value = value, "Classic\0Dark\0Light\0"))
    {
        switch (style_idx.value)
        {
        case 0: ImGui.StyleColorsClassic(); break;
        case 1: ImGui.StyleColorsDark(); break;
        case 2: ImGui.StyleColorsLight(); break;
        }
        return true;
    }
    return false;
}

// Demo helper function to select among loaded fonts.
// Here we use the regular BeginCombo()/EndCombo() api which is more the more flexible one.
export function ShowFontSelector(label: string): void
{
    const io: ImGuiIO = ImGui.GetIO();
    const font_current: ImFont = ImGui.GetFont();
    if (ImGui.BeginCombo(label, font_current.GetDebugName()))
    {
        ImGui.Selectable(font_current.GetDebugName()); // TODO
        // for (let n = 0; n < io.Fonts->Fonts.Size; n++)
        //     if (ImGui.Selectable(io.Fonts->Fonts[n]->GetDebugName(), io.Fonts->Fonts[n] === font_current))
        //         io.FontDefault = io.Fonts->Fonts[n];
        ImGui.EndCombo();
    }
    ImGui.SameLine(); 
    ShowHelpMarker(
        "- Load additional fonts with io.Fonts->AddFontFromFileTTF().\n" +
        "- The font atlas is built when calling io.Fonts->GetTexDataAsXXXX() or io.Fonts->Build().\n" +
        "- Read FAQ and documentation in extra_fonts/ for more details.\n" +
        "- If you need to add/remove fonts at runtime (e.g. for DPI change), do it before calling NewFrame().");
}

export function ShowStyleEditor(ref: ImGuiStyle | null = null): void
{
    // You can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it compares to an internally stored reference)
    const style: ImGuiStyle = ImGui.GetStyle();
    /* static */ const ref_saved_style: Static<ImGuiStyle> = STATIC("ref_saved_style", new ImGuiStyle());

    // Default to using internal storage as reference
    /* static */ const init: Static<boolean> = STATIC("init", true);
    if (init.value && ref === null)
        ref_saved_style.value.Copy(style);
    init.value = false;
    if (ref === null)
        ref = ref_saved_style.value;

    ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.50);

    if (/*ImGui.*/ShowStyleSelector("Colors##Selector"))
        ref_saved_style.value.Copy(style);
    /*ImGui.*/ShowFontSelector("Fonts##Selector");

    
    // Simplified Settings
    if (ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f"))
        style.GrabRounding = style.FrameRounding; // Make GrabRounding always the same value as FrameRounding
    { let window_border: boolean = (style.WindowBorderSize > 0.0); if (ImGui.Checkbox("WindowBorder", (value = window_border) => window_border = value)) style.WindowBorderSize = window_border ? 1.0 : 0.0; }
    ImGui.SameLine();
    { let frame_border: boolean = (style.FrameBorderSize > 0.0); if (ImGui.Checkbox("FrameBorder", (value = frame_border) => frame_border = value)) style.FrameBorderSize = frame_border ? 1.0 : 0.0; }
    ImGui.SameLine();
    { let popup_border: boolean = (style.PopupBorderSize > 0.0); if (ImGui.Checkbox("PopupBorder", (value = popup_border) => popup_border = value)) style.PopupBorderSize = popup_border ? 1.0 : 0.0; }

    // Save/Revert button
    if (ImGui.Button("Save Ref"))
        ref.Copy(ref_saved_style.value.Copy(style));
    ImGui.SameLine();
    if (ImGui.Button("Revert Ref"))
        style.Copy(ref);
    ImGui.SameLine();
    ShowHelpMarker("Save/Revert in local non-persistent storage. Default Colors definition are not affected. Use \"Export Colors\" below to save them somewhere.");

    if (ImGui.TreeNode("Rendering"))
    {
        ImGui.Checkbox("Anti-aliased lines", (value = style.AntiAliasedLines) => style.AntiAliasedLines = value); ImGui.SameLine(); ShowHelpMarker("When disabling anti-aliasing lines, you'll probably want to disable borders in your style as well.");
        ImGui.Checkbox("Anti-aliased fill", (value = style.AntiAliasedFill) => style.AntiAliasedFill = value);
        ImGui.PushItemWidth(100);
        ImGui.DragFloat("Curve Tessellation Tolerance", (value = style.CurveTessellationTol) => style.CurveTessellationTol = value, 0.02, 0.10, Number.MAX_VALUE, null, 2.0);
        if (style.CurveTessellationTol < 0.0) style.CurveTessellationTol = 0.10;
        ImGui.DragFloat("Global Alpha", (value = style.Alpha) => style.Alpha = value, 0.005, 0.20, 1.0, "%.2f"); // Not exposing zero here so user doesn't "lose" the UI (zero alpha clips all widgets). But application code could have a toggle to switch between zero and non-zero.
        ImGui.PopItemWidth();
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Settings"))
    {
        ImGui.SliderFloat2("WindowPadding", style.WindowPadding, 0.0, 20.0, "%.0f");
        ImGui.SliderFloat("PopupRounding", (value = style.PopupRounding) => style.PopupRounding = value, 0.0, 16.0, "%.0f");
        ImGui.SliderFloat2("FramePadding", style.FramePadding, 0.0, 20.0, "%.0f");
        ImGui.SliderFloat2("ItemSpacing", style.ItemSpacing, 0.0, 20.0, "%.0f");
        ImGui.SliderFloat2("ItemInnerSpacing", style.ItemInnerSpacing, 0.0, 20.0, "%.0f");
        ImGui.SliderFloat2("TouchExtraPadding", style.TouchExtraPadding, 0.0, 10.0, "%.0f");
        ImGui.SliderFloat("IndentSpacing", (value = style.IndentSpacing) => style.IndentSpacing = value, 0.0, 30.0, "%.0f");
        ImGui.SliderFloat("ScrollbarSize", (value = style.ScrollbarSize) => style.ScrollbarSize = value, 1.0, 20.0, "%.0f");
        ImGui.SliderFloat("GrabMinSize", (value = style.GrabMinSize) => style.GrabMinSize = value, 1.0, 20.0, "%.0f");
        ImGui.Text("BorderSize");
        ImGui.SliderFloat("WindowBorderSize", (value = style.WindowBorderSize) => style.WindowBorderSize = value, 0.0, 1.0, "%.0f");
        ImGui.SliderFloat("ChildBorderSize", (value = style.ChildBorderSize) => style.ChildBorderSize = value, 0.0, 1.0, "%.0f");
        ImGui.SliderFloat("PopupBorderSize", (value = style.PopupBorderSize) => style.PopupBorderSize = value, 0.0, 1.0, "%.0f");
        ImGui.SliderFloat("FrameBorderSize", (value = style.FrameBorderSize) => style.FrameBorderSize = value, 0.0, 1.0, "%.0f");
        ImGui.Text("Rounding");
        ImGui.SliderFloat("WindowRounding", (value = style.WindowRounding) => style.WindowRounding = value, 0.0, 14.0, "%.0f");
        ImGui.SliderFloat("ChildRounding", (value = style.ChildRounding) => style.ChildRounding = value, 0.0, 16.0, "%.0f");
        ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f");
        ImGui.SliderFloat("ScrollbarRounding", (value = style.ScrollbarRounding) => style.ScrollbarRounding = value, 0.0, 12.0, "%.0f");
        ImGui.SliderFloat("GrabRounding", (value = style.GrabRounding) => style.GrabRounding = value, 0.0, 12.0, "%.0f");
        ImGui.Text("Alignment");
        ImGui.SliderFloat2("WindowTitleAlign", style.WindowTitleAlign, 0.0, 1.0, "%.2f");
        ImGui.SliderFloat2("ButtonTextAlign", style.ButtonTextAlign, 0.0, 1.0, "%.2f"); ImGui.SameLine(); ShowHelpMarker("Alignment applies when a button is larger than its text content.");
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Colors"))
    {
        /* static */ const output_dest: Static<number> = STATIC("output_dest", 0);
        /* static */ const output_only_modified: Static<boolean> = STATIC("output_only_modified", true);
        if (ImGui.Button("Export Unsaved"))
        {
            if (output_dest.value === 0)
                ImGui.LogToClipboard();
            else
                ImGui.LogToTTY();
            ImGui.LogText("ImVec4* colors = ImGui.GetStyle().Colors;" + IM_NEWLINE);
            for (let i = 0; i < ImGuiCol.COUNT; i++)
            {
                const col: Readonly<interface_ImVec4> = style.Colors[i];
                const name: string = ImGui.GetStyleColorName(i);
                if (!output_only_modified.value || !col.Equals(ref.Colors[i]))
                    ImGui.LogText(`colors[ImGuiCol.${name}] = new ImVec4(${col.x.toFixed(2)}, ${col.y.toFixed(2)}, ${col.z.toFixed(2)}, ${col.w.toFixed(2)});` + IM_NEWLINE);
            }
            ImGui.LogFinish();
        }
        ImGui.SameLine(); ImGui.PushItemWidth(120); ImGui.Combo("##output_type", (value = output_dest.value) => output_dest.value = value, "To Clipboard\0To TTY\0"); ImGui.PopItemWidth();
        ImGui.SameLine(); ImGui.Checkbox("Only Modified Colors", (value = output_only_modified.value) => output_only_modified.value = value);

        ImGui.Text("Tip: Left-click on colored square to open color picker,\nRight-click to open edit options menu.");

        /* static */ const filter: Static<ImGuiTextFilter> = STATIC("filter#2223", new ImGuiTextFilter());
        filter.value.Draw("Filter colors", 200);

        /* static */ const alpha_flags: Static<ImGuiColorEditFlags> = STATIC("alpha_flags", 0);
        ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0); ImGui.SameLine(); 
        ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, ImGuiColorEditFlags.AlphaPreview); ImGui.SameLine(); 
        ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, ImGuiColorEditFlags.AlphaPreviewHalf);

        ImGui.BeginChild("#colors", new ImVec2(0, 300), true, ImGuiWindowFlags.AlwaysVerticalScrollbar | ImGuiWindowFlags.AlwaysHorizontalScrollbar);
        ImGui.PushItemWidth(-160);
        for (let i = 0; i < ImGuiCol.COUNT; i++)
        {
            const name: string = ImGui.GetStyleColorName(i);
            if (!filter.value.PassFilter(name))
                continue;
            ImGui.PushID(i);
            ImGui.ColorEdit4("##color", style.Colors[i], ImGuiColorEditFlags.AlphaBar | alpha_flags.value);
            if (!style.Colors[i].Equals(ref.Colors[i]))
            {
                // Tips: in a real user application, you may want to merge and use an icon font into the main font, so instead of "Save"/"Revert" you'd use icons.
                // Read the FAQ and extra_fonts/README.txt about using icon fonts. It's really easy and super convenient!
                ImGui.SameLine(0.0, style.ItemInnerSpacing.x); if (ImGui.Button("Save")) ref.Colors[i].Copy(style.Colors[i]);
                ImGui.SameLine(0.0, style.ItemInnerSpacing.x); if (ImGui.Button("Revert")) style.Colors[i].Copy(ref.Colors[i]);
            }
            ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
            ImGui.TextUnformatted(name);
            ImGui.PopID();
        }
        ImGui.PopItemWidth();
        ImGui.EndChild();

        ImGui.TreePop();
    }

    // bool fonts_opened = ImGui.TreeNode("Fonts", "Fonts (%d)", ImGui.GetIO().Fonts->Fonts.Size);
    const fonts_opened: boolean = ImGui.TreeNode("Fonts");
    if (fonts_opened)
    {
        const atlas: ImFontAtlas = ImGui.GetIO().Fonts;
        if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`))
        {
            ImGui.Image(atlas.TexID, new ImVec2(atlas.TexWidth, atlas.TexHeight), new ImVec2(0,0), new ImVec2(1,1), new ImColor(255,255,255,255).Value, new ImColor(255,255,255,128).Value);
            ImGui.TreePop();
        }
        ImGui.PushItemWidth(100);
        // for (let i = 0; i < atlas->Fonts.Size; i++)
        // {
        //     ImFont* font = atlas->Fonts[i];
        //     ImGui.PushID(font);
        //     bool font_details_opened = ImGui.TreeNode(font, "Font %d: \'%s\', %.2f px, %d glyphs", i, font->ConfigData ? font->ConfigData[0].Name : "", font->FontSize, font->Glyphs.Size);
        //     ImGui.SameLine(); if (ImGui.SmallButton("Set as default")) ImGui.GetIO().FontDefault = font;
        //     if (font_details_opened)
        //     {
        //         ImGui.PushFont(font);
        //         ImGui.Text("The quick brown fox jumps over the lazy dog");
        //         ImGui.PopFont();
        //         ImGui.DragFloat("Font scale", &font->Scale, 0.005f, 0.3f, 2.0f, "%.1f");   // Scale only this font
        //         ImGui.SameLine(); ShowHelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\nFont are currently rendered into bitmaps at a given size at the time of building the atlas. You may oversample them to get some flexibility with scaling. You can also render at multiple sizes and select which one to use at runtime.\n\n(Glimmer of hope: the atlas system should hopefully be rewritten in the future to make scaling more natural and automatic.)");
        //         ImGui.Text("Ascent: %f, Descent: %f, Height: %f", font->Ascent, font->Descent, font->Ascent - font->Descent);
        //         ImGui.Text("Fallback character: '%c' (%d)", font->FallbackChar, font->FallbackChar);
        //         ImGui.Text("Texture surface: %d pixels (approx) ~ %dx%d", font->MetricsTotalSurface, (int)sqrtf((float)font->MetricsTotalSurface), (int)sqrtf((float)font->MetricsTotalSurface));
        //         for (let config_i = 0; config_i < font->ConfigDataCount; config_i++)
        //         {
        //             ImFontConfig* cfg = &font->ConfigData[config_i];
        //             ImGui.BulletText("Input %d: \'%s\', Oversample: (%d,%d), PixelSnapH: %d", config_i, cfg->Name, cfg->OversampleH, cfg->OversampleV, cfg->PixelSnapH);
        //         }
        //         if (ImGui.TreeNode("Glyphs", "Glyphs (%d)", font->Glyphs.Size))
        //         {
        //             // Display all glyphs of the fonts in separate pages of 256 characters
        //             const ImFontGlyph* glyph_fallback = font->FallbackGlyph; // Forcefully/dodgily make FindGlyph() return null on fallback, which isn't the default behavior.
        //             font->FallbackGlyph = null;
        //             for (let base = 0; base < 0x10000; base += 256)
        //             {
        //                 int count = 0;
        //                 for (let n = 0; n < 256; n++)
        //                     count += font->FindGlyph((ImWchar)(base + n)) ? 1 : 0;
        //                 if (count > 0 && ImGui.TreeNode((void*)(intptr_t)base, "U+%04X..U+%04X (%d %s)", base, base+255, count, count > 1 ? "glyphs" : "glyph"))
        //                 {
        //                     float cell_spacing = style.ItemSpacing.y;
        //                     ImVec2 cell_size(font->FontSize * 1, font->FontSize * 1);
        //                     ImVec2 base_pos = ImGui.GetCursorScreenPos();
        //                     ImDrawList* draw_list = ImGui.GetWindowDrawList();
        //                     for (let n = 0; n < 256; n++)
        //                     {
        //                         ImVec2 cell_p1(base_pos.x + (n % 16) * (cell_size.x + cell_spacing), base_pos.y + (n / 16) * (cell_size.y + cell_spacing));
        //                         ImVec2 cell_p2(cell_p1.x + cell_size.x, cell_p1.y + cell_size.y);
        //                         const ImFontGlyph* glyph = font->FindGlyph((ImWchar)(base+n));;
        //                         draw_list->AddRect(cell_p1, cell_p2, glyph ? IM_COL32(255,255,255,100) : IM_COL32(255,255,255,50));
        //                         font->RenderChar(draw_list, cell_size.x, cell_p1, ImGui.GetColorU32(ImGuiCol.Text), (ImWchar)(base+n)); // We use ImFont::RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
        //                         if (glyph && ImGui.IsMouseHoveringRect(cell_p1, cell_p2))
        //                         {
        //                             ImGui.BeginTooltip();
        //                             ImGui.Text("Codepoint: U+%04X", base+n);
        //                             ImGui.Separator();
        //                             ImGui.Text("AdvanceX: %.1f", glyph->AdvanceX);
        //                             ImGui.Text("Pos: (%.2f,%.2f)->(%.2f,%.2f)", glyph->X0, glyph->Y0, glyph->X1, glyph->Y1);
        //                             ImGui.Text("UV: (%.3f,%.3f)->(%.3f,%.3f)", glyph->U0, glyph->V0, glyph->U1, glyph->V1);
        //                             ImGui.EndTooltip();
        //                         }
        //                     }
        //                     ImGui.Dummy(ImVec2((cell_size.x + cell_spacing) * 16, (cell_size.y + cell_spacing) * 16));
        //                     ImGui.TreePop();
        //                 }
        //             }
        //             font->FallbackGlyph = glyph_fallback;
        //             ImGui.TreePop();
        //         }
        //         ImGui.TreePop();
        //     }
        //     ImGui.PopID();
        // }
        /* static */ const window_scale: Static<number> = STATIC("window_scale", 1.0);
        ImGui.DragFloat("this window scale", (value = window_scale.value) => window_scale.value = value, 0.005, 0.3, 2.0, "%.1f");              // scale only this window
        ImGui.DragFloat("global scale", (value = ImGui.GetIO().FontGlobalScale) => ImGui.GetIO().FontGlobalScale = value, 0.005, 0.3, 2.0, "%.1f"); // scale everything
        ImGui.PopItemWidth();
        ImGui.SetWindowFontScale(window_scale.value);
        ImGui.TreePop();
    }

    ImGui.PopItemWidth();
}

// Demonstrate creating a fullscreen menu bar and populating it.
function ShowExampleAppMainMenuBar(): void
{
    if (ImGui.BeginMainMenuBar())
    {
        if (ImGui.BeginMenu("File"))
        {
            ShowExampleMenuFile();
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Edit"))
        {
            if (ImGui.MenuItem("Undo", "CTRL+Z")) {}
            if (ImGui.MenuItem("Redo", "CTRL+Y", false, false)) {}  // Disabled item
            ImGui.Separator();
            if (ImGui.MenuItem("Cut", "CTRL+X")) {}
            if (ImGui.MenuItem("Copy", "CTRL+C")) {}
            if (ImGui.MenuItem("Paste", "CTRL+V")) {}
            ImGui.EndMenu();
        }
        ImGui.EndMainMenuBar();
    }
}

function ShowExampleMenuFile(): void
{
    ImGui.MenuItem("(dummy menu)", null, false, false);
    if (ImGui.MenuItem("New")) {}
    if (ImGui.MenuItem("Open", "Ctrl+O")) {}
    if (ImGui.BeginMenu("Open Recent"))
    {
        ImGui.MenuItem("fish_hat.c");
        ImGui.MenuItem("fish_hat.inl");
        ImGui.MenuItem("fish_hat.h");
        if (ImGui.BeginMenu("More.."))
        {
            ImGui.MenuItem("Hello");
            ImGui.MenuItem("Sailor");
            if (ImGui.BeginMenu("Recurse.."))
            {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            ImGui.EndMenu();
        }
        ImGui.EndMenu();
    }
    if (ImGui.MenuItem("Save", "Ctrl+S")) {}
    if (ImGui.MenuItem("Save As..")) {}
    ImGui.Separator();
    if (ImGui.BeginMenu("Options"))
    {
        /* static */ const enabled: Static<boolean> = STATIC("enabled", true);
        ImGui.MenuItem("Enabled", "", (value = enabled.value) => enabled.value = value);
        ImGui.BeginChild("child", new ImVec2(0, 60), true);
        for (let i = 0; i < 10; i++)
            ImGui.Text(`Scrolling Text ${i}`);
        ImGui.EndChild();
        /* static */ const f: Static<number> = STATIC("f#2408", 0.5);
        /* static */ const n: Static<number> = STATIC("n", 0);
        /* static */ const b: Static<boolean> = STATIC("b", true);
        ImGui.SliderFloat("Value", (value = f.value) => f.value = value, 0.0, 1.0);
        ImGui.InputFloat("Input", (value = f.value) => f.value = value, 0.1);
        ImGui.Combo("Combo", (value = n.value) => n.value = value, "Yes\0No\0Maybe\0\0");
        ImGui.Checkbox("Check", (value = b.value) => b.value = value);
        ImGui.EndMenu();
    }
    if (ImGui.BeginMenu("Colors"))
    {
        ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0,0));
        for (let i = 0; i < ImGuiCol.COUNT; i++)
        {
            const name: string = ImGui.GetStyleColorName(i as ImGuiCol);
            ImGui.ColorButton(name, ImGui.GetStyleColorVec4(i as ImGuiCol));
            ImGui.SameLine();
            ImGui.MenuItem(name);
        }
        ImGui.PopStyleVar();
        ImGui.EndMenu();
    }
    if (ImGui.BeginMenu("Disabled", false)) // Disabled
    {
        IM_ASSERT(0);
    }
    if (ImGui.MenuItem("Checked", null, true)) {}
    if (ImGui.MenuItem("Quit", "Alt+F4")) {}
}

// Demonstrate creating a window which gets auto-resized according to its content.
function ShowExampleAppAutoResize(p_open: ImAccess<boolean>): void
{
    if (!ImGui.Begin("Example: Auto-resizing window", p_open, ImGui.WindowFlags.AlwaysAutoResize))
    {
        ImGui.End();
        return;
    }

    /* static */ const lines: Static<number> = STATIC("lines#2447", 10);
    ImGui.Text("Window will resize every-frame to the size of its content.\nNote that you probably don't want to query the window size to\noutput your content because that would create a feedback loop.");
    ImGui.SliderInt("Number of lines", (value = lines.value) => lines.value = value, 1, 20);
    for (let i = 0; i < lines.value; i++)
        ImGui.Text(" ".repeat(i * 4) +  `This is line ${i}`); // Pad with space to extend size horizontally
    ImGui.End();
}

// Demonstrate creating a window with custom resize constraints.
function ShowExampleAppConstrainedResize(p_open: ImAccess<boolean>): void
{
    class CustomConstraints // Helper functions to demonstrate programmatic constraints
    {
        public static Square(data: ImGuiSizeConstraintCallbackData): void {
            data.DesiredSize.x = data.DesiredSize.y = IM_MAX(data.DesiredSize.x, data.DesiredSize.y);
        }
        public static Step(data: ImGuiSizeConstraintCallbackData): void {
            const step: number = data.UserData;
            data.DesiredSize.x = Math.floor(data.DesiredSize.x / step + 0.5) * step;
            data.DesiredSize.y = Math.floor(data.DesiredSize.y / step + 0.5) * step;
        }
    }

    /* static */ const auto_resize: Static<boolean> = STATIC("auto_resize", false);
    /* static */ const type: Static<number> = STATIC("type", 0);
    /* static */ const display_lines: Static<number> = STATIC("display_lines", 10);
    if (type.value === 0) ImGui.SetNextWindowSizeConstraints(new ImVec2(-1, 0),    new ImVec2(-1, Number.MAX_VALUE));      // Vertical only
    if (type.value === 1) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, -1),    new ImVec2(Number.MAX_VALUE, -1));      // Horizontal only
    if (type.value === 2) ImGui.SetNextWindowSizeConstraints(new ImVec2(100, 100), new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
    if (type.value === 3) ImGui.SetNextWindowSizeConstraints(new ImVec2(400, -1),  new ImVec2(500, -1));          // Width 400-500
    if (type.value === 4) ImGui.SetNextWindowSizeConstraints(new ImVec2(-1, 400),  new ImVec2(-1, 500));          // Height 400-500
    if (type.value === 5) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, 0),     new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square);   // Always Square
    if (type.value === 6) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, 0),     new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100);// Fixed Step

    const flags: ImGuiWindowFlags = auto_resize.value ? ImGuiWindowFlags.AlwaysAutoResize : 0;
    if (ImGui.Begin("Example: Constrained Resize", p_open, flags))
    {
        const desc: string[] = [
            "Resize vertical only",
            "Resize horizontal only",
            "Width > 100, Height > 100",
            "Width 400-500",
            "Height 400-500",
            "Custom: Always Square",
            "Custom: Fixed Steps (100)",
        ];
        if (ImGui.Button("200x200")) { ImGui.SetWindowSize(new ImVec2(200, 200)); } ImGui.SameLine();
        if (ImGui.Button("500x500")) { ImGui.SetWindowSize(new ImVec2(500, 500)); } ImGui.SameLine();
        if (ImGui.Button("800x200")) { ImGui.SetWindowSize(new ImVec2(800, 200)); }
        ImGui.PushItemWidth(200);
        ImGui.Combo("Constraint", (value = type.value) => type.value = value, desc, IM_ARRAYSIZE(desc));
        ImGui.DragInt("Lines", (value = display_lines.value) => display_lines.value = value, 0.2, 1, 100);
        ImGui.PopItemWidth();
        ImGui.Checkbox("Auto-resize", (value = auto_resize.value) => auto_resize.value = value);
        for (let i = 0; i < display_lines.value; i++)
            ImGui.Text(" ".repeat(i * 4) +  "Hello, sailor! Making this line long enough for the example.");
    }
    ImGui.End();
}

// Demonstrate creating a simple static window with no decoration + a context-menu to choose which corner of the screen to use.
function ShowExampleAppFixedOverlay(p_open: ImAccess<boolean>): void
{
    const DISTANCE: number = 10.0;
    /* static */ const corner: Static<number> = STATIC("corner", 0);
    const window_pos: Readonly<ImVec2> = new ImVec2((corner.value & 1) ? ImGui.GetIO().DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? ImGui.GetIO().DisplaySize.y - DISTANCE : DISTANCE);
    const window_pos_pivot: Readonly<ImVec2> = new ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
    ImGui.SetNextWindowPos(window_pos, ImGuiCond.Always, window_pos_pivot);
    ImGui.PushStyleColor(ImGuiCol.WindowBg, new ImVec4(0.0, 0.0, 0.0, 0.3)); // Transparent background
    if (ImGui.Begin("Example: Fixed Overlay", p_open, ImGuiWindowFlags.NoTitleBar|ImGuiWindowFlags.NoResize|ImGuiWindowFlags.AlwaysAutoResize|ImGuiWindowFlags.NoMove|ImGuiWindowFlags.NoSavedSettings))
    {
        ImGui.Text("Simple overlay\nin the corner of the screen.\n(right-click to change position)");
        ImGui.Separator();
        ImGui.Text(`Mouse Position: (${ImGui.GetIO().MousePos.x.toFixed(1)},${ImGui.GetIO().MousePos.y.toFixed(1)})`);
        if (ImGui.BeginPopupContextWindow())
        {
            if (ImGui.MenuItem("Top-left", null, corner.value === 0)) corner.value = 0;
            if (ImGui.MenuItem("Top-right", null, corner.value === 1)) corner.value = 1;
            if (ImGui.MenuItem("Bottom-left", null, corner.value === 2)) corner.value = 2;
            if (ImGui.MenuItem("Bottom-right", null, corner.value === 3)) corner.value = 3;
            ImGui.EndPopup();
        }
        ImGui.End();
    }
    ImGui.PopStyleColor();
}

// Demonstrate using "##" and "###" in identifiers to manipulate ID generation.
// This apply to regular items as well. Read FAQ section "How can I have multiple widgets with the same label? Can I have widget without a label? (Yes). A primer on the purpose of labels/IDs." for details.
function ShowExampleAppWindowTitles(p_open: ImAccess<boolean>): void
{
    // By default, Windows are uniquely identified by their title.
    // You can use the "##" and "###" markers to manipulate the display/ID.

    // Using "##" to display same title but have unique identifier.
    ImGui.SetNextWindowPos(new ImVec2(100,100), ImGuiCond.FirstUseEver);
    ImGui.Begin("Same title as another window##1");
    ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
    ImGui.End();

    ImGui.SetNextWindowPos(new ImVec2(100,200), ImGuiCond.FirstUseEver);
    ImGui.Begin("Same title as another window##2");
    ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
    ImGui.End();

    // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
    const buf: string = `Animated title ${"|/-\\".charAt((ImGui.GetTime()/0.25)&3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
    ImGui.SetNextWindowPos(new ImVec2(100,300), ImGuiCond.FirstUseEver);
    ImGui.Begin(buf);
    ImGui.Text("This window has a changing title.");
    ImGui.End();
}

// Demonstrate using the low-level ImDrawList to draw custom shapes. 
function ShowExampleAppCustomRendering(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(350,560), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Custom rendering", p_open))
    {
        ImGui.End();
        return;
    }

    // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of overloaded operators, etc.
    // Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your types and ImVec2/ImVec4.
    // ImGui defines overloaded operators but they are internal to imgui.cpp and not exposed outside (to avoid messing with your types)
    // In this example we are not using the maths operators!
    // ImDrawList* draw_list = ImGui.GetWindowDrawList();
    const draw_list: ImDrawList = ImGui.GetWindowDrawList();

    // Primitives
    ImGui.Text("Primitives");
    /* static */ const sz: Static<number> = STATIC("sz", 36.0);
    /* static */ const col: Static<ImVec4> = STATIC("color#2583", new ImVec4(1.0,1.0,0.4,1.0));
    ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
    ImGui.ColorEdit3("Color", col.value)
    {
        const p: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
        const col32: ImU32 = IM_COL32(col.value.x*255, col.value.y*255, col.value.z*255, col.value.w*255);
        let x: number = p.x + 4.0, y: number = p.y + 4.0, spacing: number = 8.0;
        for (let n = 0; n < 2; n++)
        {
            const thickness: number = (n === 0) ? 1.0 : 4.0;
            draw_list.AddCircle(new ImVec2(x+sz.value*0.5, y+sz.value*0.5), sz.value*0.5, col32, 20, thickness); x += sz.value+spacing;
            draw_list.AddRect(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, 0.0, ImDrawCornerFlags.All, thickness); x += sz.value+spacing;
            draw_list.AddRect(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, 10.0, ImDrawCornerFlags.All, thickness); x += sz.value+spacing;
            draw_list.AddRect(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, 10.0, ImDrawCornerFlags.TopLeft|ImDrawCornerFlags.BotRight, thickness); x += sz.value+spacing;
            draw_list.AddTriangle(new ImVec2(x+sz.value*0.5, y), new ImVec2(x+sz.value,y+sz.value-0.5), new ImVec2(x,y+sz.value-0.5), col32, thickness); x += sz.value+spacing;
            draw_list.AddLine(new ImVec2(x, y), new ImVec2(x+sz.value, y   ), col32, thickness); x += sz.value+spacing;
            draw_list.AddLine(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, thickness); x += sz.value+spacing;
            draw_list.AddLine(new ImVec2(x, y), new ImVec2(x,    y+sz.value), col32, thickness); x += spacing;
            draw_list.AddBezierCurve(new ImVec2(x, y), new ImVec2(x+sz.value*1.3,y+sz.value*0.3), new ImVec2(x+sz.value-sz.value*1.3,y+sz.value-sz.value*0.3), new ImVec2(x+sz.value, y+sz.value), col32, thickness);
            x = p.x + 4;
            y += sz.value+spacing;
        }
        draw_list.AddCircleFilled(new ImVec2(x+sz.value*0.5, y+sz.value*0.5), sz.value*0.5, col32, 32); x += sz.value+spacing;
        draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32); x += sz.value+spacing;
        draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, 10.0); x += sz.value+spacing;
        draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), col32, 10.0, ImDrawCornerFlags.TopLeft|ImDrawCornerFlags.BotRight); x += sz.value+spacing;
        draw_list.AddTriangleFilled(new ImVec2(x+sz.value*0.5, y), new ImVec2(x+sz.value,y+sz.value-0.5), new ImVec2(x,y+sz.value-0.5), col32); x += sz.value+spacing;
        draw_list.AddRectFilledMultiColor(new ImVec2(x, y), new ImVec2(x+sz.value, y+sz.value), IM_COL32(0,0,0), IM_COL32(255,0,0), IM_COL32(255,255,0), IM_COL32(0,255,0));
        ImGui.Dummy(new ImVec2((sz.value+spacing)*8, (sz.value+spacing)*3));
    }
    ImGui.Separator();
    {
        /* static */ const points: Static<ImVector<ImVec2>> = STATIC("points", new ImVector<ImVec2>());
        /* static */ const adding_line: Static<boolean> = STATIC("adding_line", false);
        ImGui.Text("Canvas example");
        if (ImGui.Button("Clear")) points.value.clear();
        if (points.value.Size >= 2) { ImGui.SameLine(); if (ImGui.Button("Undo")) { points.value.pop_back(); points.value.pop_back(); } }
        ImGui.Text("Left-click and drag to add lines,\nRight-click to undo");

        // Here we are using InvisibleButton() as a convenience to 1) advance the cursor and 2) allows us to use IsItemHovered()
        // However you can draw directly and poll mouse/keyboard by yourself. You can manipulate the cursor using GetCursorPos() and SetCursorPos().
        // If you only use the ImDrawList API, you can notify the owner window of its extends by using SetCursorPos(max).
        const canvas_pos: ImVec2 = ImGui.GetCursorScreenPos();            // ImDrawList API uses screen coordinates!
        const canvas_size: ImVec2 = ImGui.GetContentRegionAvail();        // Resize canvas to what's available
        if (canvas_size.x < 50.0) canvas_size.x = 50.0;
        if (canvas_size.y < 50.0) canvas_size.y = 50.0;
        draw_list.AddRectFilledMultiColor(canvas_pos, new ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), IM_COL32(50,50,50), IM_COL32(50,50,60), IM_COL32(60,60,70), IM_COL32(50,50,60));
        draw_list.AddRect(canvas_pos, new ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), IM_COL32(255,255,255));

        let adding_preview: boolean = false;
        ImGui.InvisibleButton("canvas", canvas_size);
        const mouse_pos_in_canvas: ImVec2 = new ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
        if (adding_line.value)
        {
            adding_preview = true;
            points.value.push_back(mouse_pos_in_canvas);
            if (!ImGui.GetIO().MouseDown[0])
                adding_line.value = adding_preview = false;
        }
        if (ImGui.IsItemHovered())
        {
            if (!adding_line.value && ImGui.IsMouseClicked(0))
            {
                points.value.push_back(mouse_pos_in_canvas);
                adding_line.value = true;
            }
            if (ImGui.IsMouseClicked(1) && !points.value.empty())
            {
                adding_line.value = adding_preview = false;
                points.value.pop_back();
                points.value.pop_back();
            }
        }
        draw_list.PushClipRect(canvas_pos, new ImVec2(canvas_pos.x+canvas_size.x, canvas_pos.y+canvas_size.y), true);      // clip lines within the canvas (if we resize it, etc.)
        for (let i = 0; i < points.value.Size - 1; i += 2)
            draw_list.AddLine(new ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new ImVec2(canvas_pos.x + points.value.Data[i+1].x, canvas_pos.y + points.value.Data[i+1].y), IM_COL32(255,255,0,255), 2.0);
        draw_list.PopClipRect();
        if (adding_preview)
            points.value.pop_back();
    }
    ImGui.End();
}

// Demonstrating creating a simple console window, with scrolling, filtering, completion and history.
// For the console example, here we are using a more C++ like approach of declaring a class to hold the data and the functions.
class ExampleAppConsole {
    // char                  InputBuf[256];
    InputBuf: ImStringBuffer = new ImStringBuffer(256, "");
    // ImVector<char*>       Items;
    Items: ImVector<string> = new ImVector<string>();
    // bool                  ScrollToBottom;
    ScrollToBottom: boolean = false;
    // ImVector<char*>       History;
    History: ImVector<string> = new ImVector<string>();
    // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
    HistoryPos: number = -1;
    // ImVector<const char*> Commands;
    Commands: ImVector<string> = new ImVector<string>();

    constructor() {
        this.ClearLog();
        // memset(InputBuf, 0, sizeof(InputBuf));
        this.InputBuf.buffer = "";
        this.HistoryPos = -1;
        this.Commands.push_back("HELP");
        this.Commands.push_back("HISTORY");
        this.Commands.push_back("CLEAR");
        this.Commands.push_back("CLASSIFY");  // "classify" is here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
        this.AddLog("Welcome to ImGui!");
    }

    delete(): void {}

    // Portable helpers
    // static int   Stricmp(const char* str1, const char* str2)         { int d; while ((d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; } return d; }
    // static int   Strnicmp(const char* str1, const char* str2, int n) { int d = 0; while (n > 0 && (d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; n--; } return d; }
    // static char* Strdup(const char *str)                             { size_t len = strlen(str) + 1; void* buff = malloc(len); return (char*)memcpy(buff, (const void*)str, len); }

    ClearLog(): void {
        // for (let i = 0; i < Items.Size; i++)
        //     free(Items[i]);
        this.Items.clear();
        this.ScrollToBottom = true;
    }

    // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
    AddLog(fmt: string): void {
        // FIXME-OPT
        // char buf[1024];
        // va_list args;
        // va_start(args, fmt);
        // vsnprintf(buf, IM_ARRAYSIZE(buf), fmt, args);
        // buf[IM_ARRAYSIZE(buf)-1] = 0;
        // va_end(args);
        // Items.push_back(Strdup(buf));
        this.Items.push_back(fmt);
        this.ScrollToBottom = true;
    }

    // void    Draw(const char* title, bool* p_open)
    Draw(title: string, p_open: ImAccess<boolean>): void
    {
        ImGui.SetNextWindowSize(new ImVec2(520,600), ImGuiCond.FirstUseEver);
        if (!ImGui.Begin(title, p_open))
        {
            ImGui.End();
            return;
        }

        // As a specific feature guaranteed by the library, after calling Begin() the last Item represent the title bar. So e.g. IsItemHovered() will return true when hovering the title bar.
        // Here we create a context menu only available from the title bar.
        if (ImGui.BeginPopupContextItem())
        {
            if (ImGui.MenuItem("Close"))
                // *p_open = false;
                p_open(false);
            ImGui.EndPopup();
        }

        ImGui.TextWrapped("This example implements a console with basic coloring, completion and history. A more elaborate implementation may want to store entries along with extra data such as timestamp, emitter, etc.");
        ImGui.TextWrapped("Enter 'HELP' for help, press TAB to use text completion.");

        // TODO: display items starting from the bottom

        if (ImGui.SmallButton("Add Dummy Text")) { this.AddLog(`${this.Items.Size} some text`); this.AddLog("some more text"); this.AddLog("display very important message here!"); } ImGui.SameLine();
        if (ImGui.SmallButton("Add Dummy Error")) { this.AddLog("[error] something went wrong"); } ImGui.SameLine();
        if (ImGui.SmallButton("Clear")) { this.ClearLog(); } ImGui.SameLine();
        const copy_to_clipboard: boolean = ImGui.SmallButton("Copy"); ImGui.SameLine();
        if (ImGui.SmallButton("Scroll to bottom")) this.ScrollToBottom = true;
        // /* static */ const t: Static<number> = getStatic("t", 0.0); if (ImGui.GetTime() - t > 0.02) { t = ImGui.GetTime(); this.AddLog(`Spam ${t}`); }

        ImGui.Separator();

        ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0,0));
        /* static */ const filter: Static<ImGuiTextFilter> = STATIC("filter#2763", new ImGuiTextFilter());
        filter.value.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
        ImGui.PopStyleVar();
        ImGui.Separator();

        const footer_height_to_reserve: number = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
        ImGui.BeginChild("ScrollingRegion", new ImVec2(0, -footer_height_to_reserve), false, ImGuiWindowFlags.HorizontalScrollbar); // Leave room for 1 separator + 1 InputText
        if (ImGui.BeginPopupContextWindow())
        {
            if (ImGui.Selectable("Clear")) this.ClearLog();
            ImGui.EndPopup();
        }

        // Display every line as a separate entry so we can change their color or add custom widgets. If you only want raw text you can use ImGui.TextUnformatted(log.begin(), log.end());
        // NB- if you have thousands of entries this approach may be too inefficient and may require user-side clipping to only process visible items.
        // You can seek and display only the lines that are visible using the ImGuiListClipper helper, if your elements are evenly spaced and you have cheap random access to the elements.
        // To use the clipper we could replace the 'for (let i = 0; i < Items.Size; i++)' loop with:
        //     ImGuiListClipper clipper(Items.Size);
        //     while (clipper.Step())
        //         for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
        // However take note that you can not use this code as is if a filter is active because it breaks the 'cheap random-access' property. We would need random-access on the post-filtered list.
        // A typical application wanting coarse clipping and filtering may want to pre-compute an array of indices that passed the filtering test, recomputing this array when user changes the filter,
        // and appending newly elements as they are inserted. This is left as a task to the user until we can manage to improve this example code!
        // If your items are of variable size you may want to implement code similar to what ImGuiListClipper does. Or split your data into fixed height items to allow random-seeking into your list.
        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(4,1)); // Tighten spacing
        if (copy_to_clipboard)
            ImGui.LogToClipboard();
        for (let i = 0; i < this.Items.Size; i++)
        {
            // const char* item = Items[i];
            const item: string = this.Items.Data[i];
            if (!filter.value.PassFilter(item))
                continue;
            // ImVec4 col = ImVec4(1.0f,1.0f,1.0f,1.0f); // A better implementation may store a type per-item. For the sample let's just parse the text.
            let col: ImVec4 = new ImVec4(1.0,1.0,1.0,1.0); // A better implementation may store a type per-item. For the sample let's just parse the text.
            // if (strstr(item, "[error]")) col = ImColor(1.0f,0.4f,0.4f,1.0f);
            if (/\[error\]/.test(item)) col = new ImVec4(1.0,0.4,0.4,1.0);
            // else if (strncmp(item, "# ", 2) === 0) col = ImColor(1.0f,0.78f,0.58f,1.0f);
            else if (/^# /.test(item)) col = new ImVec4(1.0,0.78,0.58,1.0);
            ImGui.PushStyleColor(ImGuiCol.Text, col);
            ImGui.TextUnformatted(item);
            ImGui.PopStyleColor();
        }
        if (copy_to_clipboard)
            ImGui.LogFinish();
        if (this.ScrollToBottom)
            ImGui.SetScrollHere();
        this.ScrollToBottom = false;
        ImGui.PopStyleVar();
        ImGui.EndChild();
        ImGui.Separator();

        // Command-line
        if (ImGui.InputText("Input", this.InputBuf, IM_ARRAYSIZE(this.InputBuf), ImGuiInputTextFlags.EnterReturnsTrue|ImGuiInputTextFlags.CallbackCompletion|ImGuiInputTextFlags.CallbackHistory, ExampleAppConsole.TextEditCallbackStub, this))
        {
            // char* input_end = InputBuf+strlen(InputBuf);
            // while (input_end > InputBuf && input_end[-1] === ' ') { input_end--; } *input_end = 0;
            this.InputBuf.buffer = this.InputBuf.buffer.trim();
            // if (InputBuf[0])
            if (this.InputBuf.buffer.length > 0)
                this.ExecCommand(this.InputBuf.buffer);
            // strcpy(InputBuf, "");
            this.InputBuf.buffer = "";
        }

        // Demonstrate keeping auto focus on the input box
        if (ImGui.IsItemHovered() || (ImGui.IsWindowFocused(ImGuiFocusedFlags.RootAndChildWindows) && !ImGui.IsAnyItemActive() && !ImGui.IsMouseClicked(0)))
            ImGui.SetKeyboardFocusHere(-1); // Auto focus previous widget

        ImGui.End();
    }

    // void    ExecCommand(const char* command_line)
    ExecCommand(command_line: string): void
    {
        this.AddLog(`# ${command_line}\n`);

        // Insert into history. First find match and delete it so it can be pushed to the back. This isn't trying to be smart or optimal.
        this.HistoryPos = -1;
        for (let i = this.History.Size-1; i >= 0; i--)
            // if (Stricmp(History[i], command_line) === 0)
            if (this.History.Data[i].toLowerCase() === command_line.toLowerCase())
            {
                // free(History[i]);
                // History.erase(History.begin() + i);
                break;
            }
        // History.push_back(Strdup(command_line));
        this.History.push_back(command_line);

        // Process command
        // if (Stricmp(command_line, "CLEAR") === 0)
        if (command_line.toUpperCase() === "CLEAR")
        {
            this.ClearLog();
        }
        // else if (Stricmp(command_line, "HELP") === 0)
        else if (command_line.toUpperCase() === "HELP")
        {
            this.AddLog("Commands:");
            for (let i = 0; i < this.Commands.Size; i++)
                this.AddLog(`- ${this.Commands.Data[i]}`);
        }
        // else if (Stricmp(command_line, "HISTORY") === 0)
        else if (command_line.toUpperCase() === "HISTORY")
        {
            const first: number = this.History.Size - 10;
            for (let i = first > 0 ? first : 0; i < this.History.Size; i++)
                this.AddLog(`${i}: ${this.History.Data[i]}\n`);
        }
        else
        {
           this.AddLog(`Unknown command: '${command_line}'\n`);
        }
    }

    // static const TextEditCallbackStub: number(ImGuiTextEditCallbackData* data) // In C++11 you are better off using lambdas for this sort of forwarding callbacks
    static TextEditCallbackStub(data: ImGuiTextEditCallbackData): number
    {
        // ExampleAppConsole* console = (ExampleAppConsole*)data->UserData;
        const console: ExampleAppConsole = data.UserData as ExampleAppConsole;
        return console.TextEditCallback(data);
    }

    // int     TextEditCallback(ImGuiTextEditCallbackData* data)
    TextEditCallback(data: ImGuiTextEditCallbackData): number
    {
        //AddLog("cursor: %d, selection: %d-%d", data->CursorPos, data->SelectionStart, data->SelectionEnd);
        switch (data.EventFlag)
        {
        case ImGuiInputTextFlags.CallbackCompletion:
            {
                // Example of TEXT COMPLETION

                // Locate beginning of current word
                // const char* word_end = data->Buf + data->CursorPos;
                // const char* word_start = word_end;
                // while (word_start > data->Buf)
                // {
                //     const char c = word_start[-1];
                //     if (c === ' ' || c === '\t' || c === ',' || c === ';')
                //         break;
                //     word_start--;
                // }

                // // Build a list of candidates
                // ImVector<const char*> candidates;
                // for (let i = 0; i < Commands.Size; i++)
                //     if (Strnicmp(Commands[i], word_start, (int)(word_end-word_start)) === 0)
                //         candidates.push_back(Commands[i]);

                // if (candidates.Size === 0)
                // {
                //     // No match
                //     AddLog("No match for \"%.*s\"!\n", (int)(word_end-word_start), word_start);
                // }
                // else if (candidates.Size === 1)
                // {
                //     // Single match. Delete the beginning of the word and replace it entirely so we've got nice casing
                //     data->DeleteChars((int)(word_start-data->Buf), (int)(word_end-word_start));
                //     data->InsertChars(data->CursorPos, candidates[0]);
                //     data->InsertChars(data->CursorPos, " ");
                // }
                // else
                // {
                //     // Multiple matches. Complete as much as we can, so inputing "C" will complete to "CL" and display "CLEAR" and "CLASSIFY"
                //     int match_len = (int)(word_end - word_start);
                //     for (;;)
                //     {
                //         int c = 0;
                //         bool all_candidates_matches = true;
                //         for (let i = 0; i < candidates.Size && all_candidates_matches; i++)
                //             if (i === 0)
                //                 c = toupper(candidates[i][match_len]);
                //             else if (c === 0 || c !== toupper(candidates[i][match_len]))
                //                 all_candidates_matches = false;
                //         if (!all_candidates_matches)
                //             break;
                //         match_len++;
                //     }

                //     if (match_len > 0)
                //     {
                //         data->DeleteChars((int)(word_start - data->Buf), (int)(word_end-word_start));
                //         data->InsertChars(data->CursorPos, candidates[0], candidates[0] + match_len);
                //     }

                //     // List matches
                //     AddLog("Possible matches:\n");
                //     for (let i = 0; i < candidates.Size; i++)
                //         AddLog("- %s\n", candidates[i]);
                // }

                break;
            }
        case ImGuiInputTextFlags.CallbackHistory:
            {
                // Example of HISTORY
                // const int prev_history_pos = HistoryPos;
                // if (data->EventKey === ImGuiKey_UpArrow)
                // {
                //     if (HistoryPos === -1)
                //         HistoryPos = History.Size - 1;
                //     else if (HistoryPos > 0)
                //         HistoryPos--;
                // }
                // else if (data->EventKey === ImGuiKey_DownArrow)
                // {
                //     if (HistoryPos !== -1)
                //         if (++HistoryPos >= History.Size)
                //             HistoryPos = -1;
                // }

                // // A better implementation would preserve the data on the current input line along with cursor position.
                // if (prev_history_pos !== HistoryPos)
                // {
                //     data->CursorPos = data->SelectionStart = data->SelectionEnd = data->BufTextLen = (int)snprintf(data->Buf, (size_t)data->BufSize, "%s", (HistoryPos >= 0) ? History[HistoryPos] : "");
                //     data->BufDirty = true;
                // }
            }
        }
        return 0;
    }
}

function ShowExampleAppConsole(p_open: ImAccess<boolean>): void
{
    /* static */ const console: Static<ExampleAppConsole> = STATIC("console", new ExampleAppConsole());
    console.value.Draw("Example: Console", p_open);
}

// Usage:
//  static ExampleAppLog my_log;
//  my_log.AddLog("Hello %d world\n", 123);
//  my_log.Draw("title");
class ExampleAppLog
{
    // ImGuiTextBuffer     Buf;
    Buf: ImGuiTextBuffer = new ImGuiTextBuffer();
    // ImGuiTextFilter     Filter;
    Filter: ImGuiTextFilter = new ImGuiTextFilter();
    // ImVector<int>       LineOffsets;        // Index to lines offset
    LineOffsets: ImVector<number> = new ImVector<number>();
    // bool                ScrollToBottom;
    ScrollToBottom: boolean = false;

    // void    Clear()     { Buf.clear(); LineOffsets.clear(); }
    Clear(): void { this.Buf.clear(); this.LineOffsets.clear(); }

    // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
    AddLog(fmt: string): void
    {
        let old_size: number = this.Buf.size();
        // va_list args;
        // va_start(args, fmt);
        // Buf.appendfv(fmt, args);
        // va_end(args);
        this.Buf.append(fmt);
        for (let new_size = this.Buf.size(); old_size < new_size; old_size++)
            if (this.Buf.Buf[old_size] === '\n')
                this.LineOffsets.push_back(old_size);
        this.ScrollToBottom = true;
    }

    Draw(title: string, p_open: ImAccess<boolean>): void
    {
        ImGui.SetNextWindowSize(new ImVec2(500,400), ImGuiCond.FirstUseEver);
        ImGui.Begin(title, p_open);
        if (ImGui.Button("Clear")) this.Clear();
        ImGui.SameLine();
        const copy: boolean = ImGui.Button("Copy");
        ImGui.SameLine();
        this.Filter.Draw("Filter", -100.0);
        ImGui.Separator();
        ImGui.BeginChild("scrolling", new ImVec2(0,0), false, ImGuiWindowFlags.HorizontalScrollbar);
        if (copy) ImGui.LogToClipboard();

        if (this.Filter.IsActive())
        {
            // const char* buf_begin = Buf.begin();
            // const char* line = buf_begin;
            // for (let line_no = 0; line !== null; line_no++)
            // {
            //     const char* line_end = (line_no < LineOffsets.Size) ? buf_begin + LineOffsets[line_no] : null;
            //     if (Filter.PassFilter(line, line_end))
            //         ImGui.TextUnformatted(line, line_end);
            //     line = line_end && line_end[1] ? line_end + 1 : null;
            // }
        }
        else
        {
            ImGui.TextUnformatted(this.Buf.begin());
        }

        if (this.ScrollToBottom)
            ImGui.SetScrollHere(1.0);
        this.ScrollToBottom = false;
        ImGui.EndChild();
        ImGui.End();
    }
}

// Demonstrate creating a simple log window with basic filtering.
function ShowExampleAppLog(p_open: ImAccess<boolean>): void
{
    /* static */ const log: Static<ExampleAppLog> = STATIC("log#3073", new ExampleAppLog());

    // Demo: add random items (unless Ctrl is held)
    /* static */ const last_time: Static<number> = STATIC("last_time", -1.0);
    const time: number = ImGui.GetTime();
    if (time - last_time.value >= 0.20 && !ImGui.GetIO().KeyCtrl)
    {
        const random_words: string[] = [ "system", "info", "warning", "error", "fatal", "notice", "log" ];
        // log.AddLog("[%s] Hello, time is %.1f, frame count is %d\n", random_words[rand() % IM_ARRAYSIZE(random_words)], time, ImGui.GetFrameCount());
        log.value.AddLog(`[${random_words[Math.floor(Math.random() * IM_ARRAYSIZE(random_words))]}] Hello, time is ${time.toFixed(1)}, frame count is ${ImGui.GetFrameCount()}\n`);
        last_time.value = time;
    }

    log.value.Draw("Example: Log", p_open);
}

// Demonstrate create a window with multiple child windows.
function ShowExampleAppLayout(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(500, 440), ImGuiCond.FirstUseEver);
    if (ImGui.Begin("Example: Layout", p_open, ImGuiWindowFlags.MenuBar))
    {
        if (ImGui.BeginMenuBar())
        {
            if (ImGui.BeginMenu("File"))
            {
                if (ImGui.MenuItem("Close")) p_open(false);
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }

        // left
        /* static */ const selected: Static<number> = STATIC("selected#3106", 0);
        ImGui.BeginChild("left pane", new ImVec2(150, 0), true);
        for (let i = 0; i < 100; i++)
        {
            const label: string = `MyObject ${i}`;
            if (ImGui.Selectable(label, selected.value === i))
                selected.value = i;
        }
        ImGui.EndChild();
        ImGui.SameLine();

        // right
        ImGui.BeginGroup();
            ImGui.BeginChild("item view", new ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
                ImGui.Text(`MyObject: ${selected}`);
                ImGui.Separator();
                ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ");
            ImGui.EndChild();
            if (ImGui.Button("Revert")) {}
            ImGui.SameLine();
            if (ImGui.Button("Save")) {}
        ImGui.EndGroup();
    }
    ImGui.End();
}

// Demonstrate create a simple property editor.
function ShowExampleAppPropertyEditor(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(430,450), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Property editor", p_open))
    {
        ImGui.End();
        return;
    }

    ShowHelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");

    ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(2,2));
    ImGui.Columns(2);
    ImGui.Separator();

    class funcs
    {
        static ShowDummyObject(prefix: string, uid: number): void
        {
            ImGui.PushID(uid);                      // Use object uid as identifier. Most commonly you could also use the object pointer as a base ID.
            ImGui.AlignTextToFramePadding();  // Text and Tree nodes are less high than regular widgets, here we add vertical spacing to make the tree lines equal high.
            const node_open: boolean = ImGui.TreeNode("Object", `${prefix}_${uid}`);
            ImGui.NextColumn();
            ImGui.AlignTextToFramePadding();
            ImGui.Text("my sailor is rich");
            ImGui.NextColumn();
            if (node_open)
            {
                /* static */ const dummy_members: Static<number[/*8*/]> = STATIC("dummy_members", [ 0.0,0.0,1.0,3.1416,100.0,999.0 ]);
                for (let i = 0; i < 8; i++)
                {
                    ImGui.PushID(i); // Use field index as identifier.
                    if (i < 2)
                    {
                        funcs.ShowDummyObject("Child", 424242);
                    }
                    else
                    {
                        ImGui.AlignTextToFramePadding();
                        // Here we use a Selectable (instead of Text) to highlight on hover
                        //ImGui.Text(`Field_${i}`);
                        const label: string = `Field_${i}`;
                        ImGui.Bullet();
                        ImGui.Selectable(label);
                        ImGui.NextColumn();
                        ImGui.PushItemWidth(-1);
                        const ref: ImScalar<number> = [ dummy_members.value[i] || 0 ];
                        if (i >= 5)
                            ImGui.InputFloat("##value", ref, 1.0);
                        else
                            ImGui.DragFloat("##value", ref, 0.01);
                        dummy_members.value[i] = ref[0];
                        ImGui.PopItemWidth();
                        ImGui.NextColumn();
                    }
                    ImGui.PopID();
                }
                ImGui.TreePop();
            }
            ImGui.PopID();
        }
    }

    // Iterate dummy objects with dummy members (all the same data)
    for (let obj_i = 0; obj_i < 3; obj_i++)
        funcs.ShowDummyObject("Object", obj_i);

    ImGui.Columns(1);
    ImGui.Separator();
    ImGui.PopStyleVar();
    ImGui.End();
}

// Demonstrate/test rendering huge amount of text, and the incidence of clipping.
function ShowExampleAppLongText(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(520,600), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Long text display", p_open))
    {
        ImGui.End();
        return;
    }

    /* static */ const test_type: Static<number> = STATIC("test_type", 0);
    /* static */ const log: Static<ImGuiTextBuffer> = STATIC("log#3217", new ImGuiTextBuffer());
    /* static */ const lines: Static<number> = STATIC("lines#3218", 0);
    ImGui.Text("Printing unusually long amount of text.");
    ImGui.Combo("Test type", (value = test_type.value) => test_type.value = value, "Single call to TextUnformatted()\0Multiple calls to Text(), clipped manually\0Multiple calls to Text(), not clipped (slow)\0");
    ImGui.Text(`Buffer contents: ${lines.value} lines, ${log.value.size()} bytes`);
    if (ImGui.Button("Clear")) { log.value.clear(); lines.value = 0; }
    ImGui.SameLine();
    if (ImGui.Button("Add 1000 lines"))
    {
        for (let i = 0; i < 1000; i++)
            log.value.append(`${lines.value+i} The quick brown fox jumps over the lazy dog\n`);
        lines.value += 1000;
    }
    ImGui.BeginChild("Log");
    switch (test_type.value)
    {
    case 0:
        // Single call to TextUnformatted() with a big buffer
        // ImGui.TextUnformatted(log.begin(), log.end());
        ImGui.TextUnformatted(log.value.begin());
        break;
    case 1:
        {
            // Multiple calls to Text(), manually coarsely clipped - demonstrate how to use the ImGuiListClipper helper.
            ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(0,0));
            const clipper: ImGuiListClipper = new ImGuiListClipper(lines.value);
            while (clipper.Step())
                for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
            // clipper.delete(); // NOTE: native emscripten class
            ImGui.PopStyleVar();
            break;
        }
    case 2:
        // Multiple calls to Text(), not clipped (slow)
        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(0,0));
        for (let i = 0; i < lines.value; i++)
            ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
        ImGui.PopStyleVar();
        break;
    }
    ImGui.EndChild();
    ImGui.End();
}

// End of Demo code
// #else

// export function ShowDemoWindow(p_open: ImAccess<boolean>): void {}
// export function ShowUserGuide(): void {}
// export function ShowStyleSelector(label: string): boolean { return false; }
// export function ShowFontSelector(label: string): void {}
// export function ShowStyleEditor(ref: ImGuiStyle | null = null): void {}

// #endif
