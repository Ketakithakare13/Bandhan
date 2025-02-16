package com.bandhan.request;

import lombok.Getter;
import lombok.Setter;
import com.bandhan.entity.Religion;
import com.bandhan.entity.MaritialStatus;

@Getter
@Setter
public class FilterRequest {
   /* private String income;*/
    private Religion religion;
    /*private MaritialStatus maritialStatus;*/
    private String location;
    private String occupation;
}
