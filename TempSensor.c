
// ------ Libraries and Definitions ------

#include "simpletools.h"

#include "dht22.h"

 

// ------ Global Variables and Objects ------

int k;



// ------ Main Program ------

int main() {

 

  k = 1;

  while(1) {

    dht22_read(14);term_cmd(CLS);

    print("Testing TRH Sensor");

    print("\r");

    term_cmd(CR);

    print("%s%d\r", "Reading # ", k);

    print("%s%03.1f%s\r", "Temp: ", ((float) dht22_getTemp(FAHRENHEIT)) / 10.0, " degrees F");

    // or we can select 'temperature (C)

    print("%s%03.1f%s\r", "Temp: ", ((float) ((dht22_getTemp(FAHRENHEIT) / 10 - 32)) * 5 / 9) / 1.0, " degrees C");

    print("%s%03.1f%s\r", "Relative humidity: ", ((float) dht22_getHumidity()) / 10.0, " %");

    pause(3000);

    k = (k + 1);

  }


}
