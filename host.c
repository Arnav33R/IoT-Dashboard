#include "simpletools.h"
#include "wifi.h"
#include "dht22.h"
#include "ping.h"
#include "wavplayer.h"

int event, id, handle;
int tempF, tempC, hum, dis;
int val;
int distance;

void parking_assist();

int main()
{
  wifi_start(31, 30, 115200, WX_ALL_COM);

  tempF = wifi_listen(HTTP, "/tempF");
  print("getFromPageId = %d\n", tempF);
  
  tempC = wifi_listen(HTTP, "/tempC");
  print("getFromPageId = %d\n", tempC);
  
  hum = wifi_listen(HTTP, "/hum");
  print("getFromPageId = %d\n", hum);
  
  dis = wifi_listen(HTTP, "/dis");
  print("getFromPageId = %d\n", dis);

  while(1)
  {
    wifi_poll(&event, &id, &handle); 
    print("event = %c, id = %d, handle = %d\r", 
                event,      id,      handle);

    if(event == 'G')
    {
      if(id == tempF)
      {
        high(5);
        pause(1);
        dht22_read(14);
        val = dht22_getTemp(FAHRENHEIT)/10.0;
        
        wifi_print(GET, handle, "%d\n", val);
        print("Reply to GET request:%d\n", val);
      }
      
      else if (id == tempC)
      {
        high(5);
        pause(1);
        dht22_read(14);
        val = ((dht22_getTemp(FAHRENHEIT)/10.0 - 32) * 5/9)/1.0;
        
        wifi_print(GET, handle, "%d\n", val);
        print("Reply to GET request:%d\n", val);
      }
      
      else if (id == hum)
      {
        high(5);
        pause(1);
        dht22_read(14);
        val = dht22_getHumidity()/10.0;
        
        wifi_print(GET, handle, "%d\n", val);
        print("Reply to GET request:%d\n", val);
      }        
      
      else if (id == dis)
      {
        sd_mount(22, 23, 24, 25);
        high(5);
        pause(1);
        distance = ping_cm(15);

        wifi_print(GET, handle, "%d\n", distance);
        print("Reply to GET request:%d\n", distance);
        parking_assist();
        term_cmd(CLS);
     }       
                     
    }
    pause(500);
  }    
}

// ------ Functions ------
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
