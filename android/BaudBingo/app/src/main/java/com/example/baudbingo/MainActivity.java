package com.example.baudbingo;

import android.Manifest;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Random;

import io.chirp.connect.ChirpConnect;
import io.chirp.connect.interfaces.ConnectEventListener;
import io.chirp.connect.models.ChirpError;

public class MainActivity extends AppCompatActivity
{
    String CHIRP_APP_KEY = "C5B9e0b7Bc1E057DAF4AA15BC";
    String CHIRP_APP_SECRET = "Cca551b1aFD4A161E57992a8cEc6C7A8ad6FC31B5eddf45b63";
    String CHIRP_APP_CONFIG = "N4DuqMGGfUVlEL+1u80o9wHEslaj2VCygKXFziX68ncYa8AfzifPxgIHjYi5nUgKC10QeE0FtbDKnEddp6oUNFmpCUOA0MyanusjytM1qBbQrRYxnfvUwlVDvJeeyu0Ikz0y7mALOWkDAWjXIOREstc92edk3WU37oov7SeRHeiw2cOFjKJm58/Sh7LsixdrvdLztpg9QDSJ8EEgVUdq1d0MQJ/dAZudb3tcgrZLMxmo1Z9jgSAhNiytgAa+fySFaWV+Pr6FwbFLJSZjPuMGy2Wvggt6VUxRezEZp0AWQYYObttLcO+HvIuj4U3NM+5F+HAWggkbdpQyt27khtpoqnv9x3HyQb+wKpE17r9wFF3kuOiHzHCpnZbQoZogOQ1sZL3ofyZcASWH80T4bCNCFPr5QOPrNNNrxBd0vOlJuithmepVv31q6b5v9FnKk4KpWIcpgvcPUe1INYtLYUdjuaqf+rCW2O+6P4MsI4URtHoMcm4eFLmPWW0pdJKXuJ/7mD5KaTHLpdEzIomLyleLAMJP49gCl9L7wG0rzLZafn9BZ/U4+UQxZqj0m1PG4SrrIDaCR710XRQ/Wtv9cwnVZ/3HVkafkH38zMBI6z2ThQ/wMGdFELdxJPp3OC0Ik+IdUPJ6ROgSYSC4kept9DwP5cojUGv2Y5aAsoKMVPVFCRh5glKv+n7wBe3uRWfTOQ3sJ6qhq3J4e9O9TKpnQRb9PK7a9sMrp34+KJEgrnV6rgduiqKvuV2pcKfLT9IIIjKYAt6ODYG6CuDfNtmgp7KqZ0/e4QhtbjAQp8fVWy8cXF5aapPsCwecGeZGB9eeni17u8t6iR3wTYx1d7Bm0qdF7CHGIa1MtxSONTCgEyPotNA=";

    private ChirpConnect chirpConnect;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED)
        {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, 1);
        }

        chirpConnect = new ChirpConnect(this, CHIRP_APP_KEY, CHIRP_APP_SECRET);

        ChirpError setConfigError = chirpConnect.setConfig(CHIRP_APP_CONFIG);

        ChirpError error = chirpConnect.start();

        chirpConnect.setListener(connectEventListener);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults)
    {
    }

    ConnectEventListener connectEventListener = new ConnectEventListener()
    {
        @Override
        public void onSent(@NotNull byte[] bytes, int i)
        {

        }

        @Override
        public void onSending(@NotNull byte[] bytes, int i)
        {

        }

        @Override
        public void onReceived(@Nullable byte[] bytes, int i)
        {
            String text = bytes == null ? "null" : new String(bytes);

            TextView textView = findViewById(R.id.textView);

            textView.setText(String.format("%s%s\n", textView.getText(), text));
        }

        @Override
        public void onReceiving(int i)
        {

        }

        @Override
        public void onStateChanged(int i, int i1)
        {

        }

        @Override
        public void onSystemVolumeChanged(int i, int i1)
        {

        }
    };

    public void onSend(View view)
    {
        EditText editText = findViewById(R.id.editText);

        byte[] text = editText.getText().toString().getBytes();

        long maxSize = chirpConnect.maxPayloadLength();

        if (maxSize < text.length)
        {
            return;
        }

        ChirpError error = chirpConnect.send(text);
    }
}
