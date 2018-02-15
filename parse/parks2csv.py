import csv
import json
import os

for city in os.listdir('../static_data/Parks/CityParks-JSON'):
    if(city != '.DS_Store'):
        with open('../static_data/Parks/CityParks-JSON/' + city) as f:
            print(city)
            Atlanta = json.load(f)
            results = Atlanta['results']
            with open(city[:-4] + '.csv', 'w', newline='') as csvfile:
                broWriter = csv.writer(csvfile, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
                for park in results:
                    broWriter.writerow(park['formatted_address'])
                    broWriter.writerow(str(park['geometry']['location']['lat']))
                    broWriter.writerow(str(park['geometry']['location']['lng']))
                    broWriter.writerow(park['icon'])
                    broWriter.writerow(park['name'])
                    broWriter.writerow(str(park['rating']))
            
            
    
    




