package entity

import (
    "gorm.io/gorm"
)

type Ticket struct {
    gorm.Model
    Point      int       

    //FK
    MemberID *uint
    Member   Member `gorm:"foreignKey:MemberID"`

    PaymentID *uint
    Payment   Payment `gorm:"foreignKey:PaymentID"`

    //onetomany
    Seat []Seat `gorm:"foreignKey:TicketID"`
}
