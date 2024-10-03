"""This object provide method for converting lat/lon coordinate to TWD97
    coordinate

    The code reference to
    https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/
"""
from math import tan, sin, cos, radians
import math

def TWD97ToLatLon(x, y):
    dx = 250000
    dy = 0
    lon0 = radians(121)
    k0 = 0.9999
    a = 6378137.0
    b = 6356752.314245
    e = math.pow((1 - math.pow(b, 2) / math.pow(a, 2)), 0.5)

    x -= dx
    y -= dy

    # Calculate the Meridional Arc
    M = y / k0

    # Calculate Footprint Latitude
    mu = M / (a * (1.0 - math.pow(e, 2) / 4.0 - 3 * math.pow(e, 4) / 64.0 - 5 * math.pow(e, 6) / 256.0))
    e1 = (1.0 - math.pow((1.0 - math.pow(e, 2)), 0.5)) / (1.0 + math.pow((1.0 - math.pow(e, 2)), 0.5))

    J1 = (3 * e1 / 2 - 27 * math.pow(e1, 3) / 32.0)
    J2 = (21 * math.pow(e1, 2) / 16 - 55 * math.pow(e1, 4) / 32.0)
    J3 = (151 * math.pow(e1, 3) / 96.0)
    J4 = (1097 * math.pow(e1, 4) / 512.0)

    fp = mu + J1 * math.sin(2 * mu) + J2 * math.sin(4 * mu) + J3 * math.sin(6 * mu) + J4 * math.sin(8 * mu)

    # Calculate Latitude and Longitude

    e2 = math.pow((e * a / b), 2)
    C1 = math.pow(e2 * math.cos(fp), 2)
    T1 = math.pow(math.tan(fp), 2)
    R1 = a * (1 - math.pow(e, 2)) / math.pow((1 - math.pow(e, 2) * math.pow(math.sin(fp), 2)), (3.0 / 2.0))
    N1 = a / math.pow((1 - math.pow(e, 2) * math.pow(math.sin(fp), 2)), 0.5)

    D = x / (N1 * k0)

    # lat
    Q1 = N1 * math.tan(fp) / R1
    Q2 = (math.pow(D, 2) / 2.0)
    Q3 = (5 + 3 * T1 + 10 * C1 - 4 * math.pow(C1, 2) - 9 * e2) * math.pow(D, 4) / 24.0
    Q4 = (61 + 90 * T1 + 298 * C1 + 45 * math.pow(T1, 2) - 3 * math.pow(C1, 2) - 252 * e2) * math.pow(D, 6) / 720.0
    lat = fp - Q1 * (Q2 - Q3 + Q4)

    # long
    Q5 = D
    Q6 = (1 + 2 * T1 + C1) * math.pow(D, 3) / 6
    Q7 = (5 - 2 * C1 + 28 * T1 - 3 * math.pow(C1, 2) + 8 * e2 + 24 * math.pow(T1, 2)) * math.pow(D, 5) / 120.0
    lon = lon0 + (Q5 - Q6 + Q7) / math.cos(fp)

    return [math.degrees(lat), math.degrees(lon)]
class Wsg84ToTWD97(object):
    """This object provide method for converting lat/lon coordinate to TWD97
    coordinate

    the formula reference to
    http://www.uwgb.edu/dutchs/UsefulData/UTMFormulas.htm (there is lots of typo)
    http://www.offshorediver.com/software/utm/Converting UTM to Latitude and Longitude.doc

    Parameters reference to
    http://rskl.geog.ntu.edu.tw/team/gis/doc/ArcGIS/WGS84%20and%20TM2.htm
    http://blog.minstrel.idv.tw/2004/06/taiwan-datum-parameter.html
    """

    def __init__(self,
        a = 6378137.0,
        b = 6356752.314245,
        long0 = radians(121),
        k0 = 0.9999,
        dx = 250000,
    ):
        # Equatorial radius
        self.a = a
        # Polar radius
        self.b = b
        # central meridian of zone
        self.long0 = long0
        # scale along long0
        self.k0 = k0
        # delta x in meter
        self.dx = dx

    def convert(self, lat, lon):
        """Convert lat lon to twd97

        """
        a = self.a
        b = self.b
        long0 = self.long0
        k0 = self.k0
        dx = self.dx

        e = (1-b**2/a**2)**0.5
        e2 = e**2/(1-e**2)
        n = (a-b)/(a+b)
        nu = a/(1-(e**2)*(sin(lat)**2))**0.5
        p = lon-long0

        A = a*(1 - n + (5/4.0)*(n**2 - n**3) + (81/64.0)*(n**4  - n**5))
        B = (3*a*n/2.0)*(1 - n + (7/8.0)*(n**2 - n**3) + (55/64.0)*(n**4 - n**5))
        C = (15*a*(n**2)/16.0)*(1 - n + (3/4.0)*(n**2 - n**3))
        D = (35*a*(n**3)/48.0)*(1 - n + (11/16.0)*(n**2 - n**3))
        E = (315*a*(n**4)/51.0)*(1 - n)

        S = A*lat - B*sin(2*lat) + C*sin(4*lat) - D*sin(6*lat) + E*sin(8*lat)

        K1 = S*k0
        K2 = k0*nu*sin(2*lat)/4.0
        K3 = (k0*nu*sin(lat)*(cos(lat)**3)/24.0)*(5 - tan(lat)**2 + 9*e2*(cos(lat)**2) + 4*(e2**2)*(cos(lat)**4))

        y = K1 + K2*(p**2) + K3*(p**4)

        K4 = k0*nu*cos(lat)
        K5 = (k0*nu*(cos(lat)**3)/6.0)*(1 - tan(lat)**2 + e2*(cos(lat)**2))

        x = K4*p + K5*(p**3) + self.dx
        return x, y
if __name__ == '__main__':
    from math import degrees

    c = Wsg84ToTWD97()
    lat = radians(float(25.0414391))
    lon = radians(float(121.5443622))
    print ('input lat/lon', degrees(lat), degrees(lon))
    x, y = c.convert(lat, lon)
    print (x, y)