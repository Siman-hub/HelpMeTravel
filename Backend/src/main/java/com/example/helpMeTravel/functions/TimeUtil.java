package com.example.helpMeTravel.functions;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class TimeUtil {

    //This canCatch() function compares two Day-Time pairs to determine if the former is less than the later

    public static boolean canCatch(DayOfWeek arrivalDay, LocalTime arrivalTime,
                                   DayOfWeek departureDay, LocalTime departureTime) {
        if (departureDay.getValue() > arrivalDay.getValue()) {
            return true;
        } else if (departureDay.equals(arrivalDay)) {
            return !departureTime.isBefore(arrivalTime);
        }
        return false;
    }

    public int compare(DayOfWeek d1, LocalTime t1, DayOfWeek d2, LocalTime t2) {
        int cmp = Integer.compare(d1.getValue(), d2.getValue());
        if (cmp != 0) return cmp;
        return t1.compareTo(t2);
    }
}

// This class is a utility class for designing various custom comparators.