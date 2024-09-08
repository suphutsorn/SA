package entity

import (
   "time"
   "gorm.io/gorm"
)

type Payment struct {
    gorm.Model
    TotalPrice int 
    Status string  
    Payment_time  time.Time  
	Slip  string

    //FK
    MemberID *uint
    Member   Member `gorm:"foreignKey:MemberID"`
}
