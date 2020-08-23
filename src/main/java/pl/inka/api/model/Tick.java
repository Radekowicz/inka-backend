package pl.inka.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="tick")
public class Tick {

  @Id
  private Integer id;
  private Integer value;

}
