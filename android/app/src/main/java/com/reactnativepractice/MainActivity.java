package com.reactnativepractice;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;

// Added in Module 13: Publishing the App
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // @Override
    // protected String getMainComponentName() {
    //     return "ReactNativePractice";
    // }

    // Added in Module 13: Publishing the App
    // we need t override a function that's already in ReactActivity
    @Overridepublic LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#521751"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#fa923f"));
        textView.setText("Awesome Places");
        text.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }
}
