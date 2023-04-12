/* ------ Importing Necessary Libraries ------ */
#include "simpletools.h"
#include "wifi.h"
#include "dht22.h"
#include "ping.h"
#include "wavplayer.h"
#include "abvolts.h"

/* ------ Variables to Track GET Request IDs, Paths, and Values Read ------ */
int event, id, handle;
int temp, dis, mois, par;
int val;
int distance;

/* ------ Parking Assist Function for PING Sensor (Beep Volume depends on Distance Measured) ------ */
void parking_assist() {
  if (distance >= 30  && distance < 50) {
    print(("30 <= distance < 50"));
    print("\r");
    for (int __n = 0; __n < 2; __n++) {
      wav_play("techloop.wav");
      wav_volume(7);
      pause(1000);
    }
  }
  else if (distance < 30) {
    print(("distance < 30"));
    print("\r");
    for (int __n = 0; __n < 2; __n++) {
      wav_play("techloop.wav");
      wav_volume(10);
      pause(1000);
    }
  }else {
    print(("distance >= 50"));
    print("\r");
    pause(1000);
    wav_stop();
  }
}

/* ------ Function to Read Data from Temperature/Humidity Sensor ------ */
int* get_temp_data() {
  static int data[3];
  dht22_read(14);
  data[0] = dht22_getTemp(FAHRENHEIT)/10.0;
  data[1] = ((dht22_getTemp(FAHRENHEIT)/10.0 - 32) * 5/9)/1.0;
  data[2] = dht22_getHumidity()/10.0;
  return data;
}
  
  
int main() {
  
/* ------ Initializations ------ */
  wifi_start(31, 30, 115200, WX_ALL_COM);
  sd_mount(22, 23, 24, 25);
  ad_init(21, 20, 19, 18);

/* ------ Path for Temp(F), Temp(C) and Humidity ------ */
  temp = wifi_listen(HTTP, "/temp"); 
  
/* ------ Path for Distance from PING Sensor ------ */
  dis = wifi_listen(HTTP, "/dis"); 
  
/* ------ Path for Soil Moisture ------ */
  mois = wifi_listen(HTTP, "/mois");
  
/* ------ Path for Light Intensity ------ */
  par = wifi_listen(HTTP, "/par");
  
/* ------ Main WiFI Event Loop ------ */
  while(1)
  {
    wifi_poll(&event, &id, &handle); 

    if(event == 'G')
    {
      /* ------ Return an Array of Temp(F), Temp(C), and Humidity ------ */
      if(id == temp)
      {
        int *data = get_temp_data();
        wifi_print(GET, handle, "%d, %d, %d\n", data[0], data[1], data[2]);
        print("Temp in F:%d, Temp in C:%d, Relative Humidity:%d\n", data[0], data[1], data[2]);
      }
      
      /* ------ Read and Return Distance(cm) ------ */
      else if (id == dis)
      {
        distance = ping_cm(15);
        wifi_print(GET, handle, "%d\n", distance);
        print("Distance:%d\n", distance);
        parking_assist();
      }
      
      /* ------ Read and Return Soil Moisture ------ */
      else if (id == mois)
      {
        val = ((ad_in(2) * 500 / 4096));
        wifi_print(GET, handle, "%d\n", val);
        print("Soil Moisture:%d\n", val);
      }

      /* ------ Read and Return Light Intensity ------ */
      else if (id == par)
      {
        val = ((ad_in(3) * 500 / 4096));
        wifi_print(GET, handle, "%d\n", val);
        print("Light Intensity:%d\n", val);
      }
      
      else 
      {
        continue;
      }                     
    }
  }    
}

